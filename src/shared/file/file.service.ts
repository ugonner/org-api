import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { ApiResponse, IGenericResponse } from '../apiResponse';
import { IFile } from './dto/file.dto';
import { File, FileDocument } from './file.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as filestack from 'filestack-js';
import * as toStream from 'buffer-to-stream';
import * as path from 'path';
import * as firebase from 'firebase-admin';
import * as ffmpeg from 'fluent-ffmpeg';
import { S3 } from 'aws-sdk';
import { QueryReturn, find } from '../utils/db';
import { IUploadedMedia } from './dto/media.dto';
import { StorageService } from './storage/storage.service';

@Injectable()
export class FileService {
  cloudinaryV2 = v2;
  private fB = firebase;
  private fileStack: filestack.Client;
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    private storageService: StorageService
  ) { }


  async uploadFile(
    uploadFile: Express.Multer.File | fs.ReadStream,
    userId: string,
    folder = "/challenge/",
    fileStoragePlatform: "s3" | "cloudinary" | "local",
    fileInfo: {
      fileSourceDataType: 'uploaded' | 'stream';
      fileExtension?: string;
      sourceType?: string;
    } = { fileSourceDataType: 'uploaded', sourceType: 'uploaded' },
  ): Promise<IGenericResponse<IUploadedMedia>> {
    try {
      //const result = await this.uploadFileStream(uploadFile, folder);
      
      let result;  
      if(fileStoragePlatform === "local"){
        result = await this.storageService.uploadFileLocalDisk(uploadFile as any, userId);
      }else if(fileStoragePlatform === "s3"){
        result = await this.storageService.uploadS3(uploadFile, folder, fileInfo);
      }else if(fileStoragePlatform === "cloudinary"){
        result = await this.storageService.uploadFileWithCloudinary(uploadFile as Express.Multer.File, userId, folder);
      }
      
      const fileObject: IFile = {
        fileId: result.fileId,
        url: result.url,
        secureUrl: result.url,
        fileType: result.fileType,
        userId,
        sourceType: result.sourceType,
      };

      const createdFile = await this.createFile(fileObject);
      const res: any = {
        id: (createdFile.data as FileDocument)._id,
        url: result.url,
        secureUrl: result.url,
        fileType: result.fileType,
      };

      return ApiResponse.success('file upload successs', 201, res);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async uploadMultipleFiles(
    uploadFiles: Express.Multer.File[],
    userId: string,
    folder = '/challenge/',
    fileStoragePlatform: "s3" | "cloudinary" | "local",
  ): Promise<IGenericResponse<IUploadedMedia[]>> {
    try {
      const result = await Promise.allSettled(
        uploadFiles.map((uploadFile) => {
          return this.uploadFile(uploadFile, userId, folder, fileStoragePlatform);
        }),
      );
      const response = result.map((res) => {
        if (res.status === 'fulfilled') {
          return res.value.data;
        }
      });
      return ApiResponse.success('files uploaded', HttpStatus.OK, response);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async createFile(
    fileDto: IFile,
  ): Promise<IGenericResponse<FileDocument | string>> {
    try {
      const createdFile = await this.fileModel.create(fileDto);
      return ApiResponse.success<FileDocument>(
        'file created ',
        HttpStatus.CREATED,
        createdFile,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFilesFromS3(fileKeys: any[]) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: fileKeys.map((key) => ({ Key: key })),
        Quiet: false, // Set to true to suppress response data (optional)
      },
    };

    this.storageService.getS3().deleteObjects(params, function (err, data) {
      if (err) {
        console.error('Error deleting files:', err);
      } else {
        console.log('Deleted files:', data.Deleted);
      }
    });
  }

  async deleteFilesByUrl(fileUrls: string[]) {
    try {
      const cloudinaryFiles = fileUrls.filter((url) => /cloudinary/i.test(url));
      const s3files = fileUrls.filter((url) => /s3/i.test(url));
      //
      const clFileIds = await this.fileModel
        .find({
          $or: [
            { secureUrl: { $in: cloudinaryFiles } },
            { url: { $in: cloudinaryFiles } },
          ],
        })
        .select({ fileId: 1 });
      const s3FileIds = await this.fileModel
        .find({
          $or: [{ secureUrl: { $in: s3files } }, { url: { $in: s3files } }],
        })
        .select({ fileId: 1 });

      let res;
      if (clFileIds.length > 0) {
        res = await this.cloudinaryV2.api.delete_resources(
          clFileIds.map((file) => file.fileId),
        );
      }
      if (s3FileIds.length > 0) {
        res = await this.deleteFilesFromS3(
          s3FileIds.map((file) => file.fileId),
        );
      }
      return ApiResponse.success('files deleted', HttpStatus.OK, res);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async deleteFilesByPulicIdS(
    fileIds: string[],
  ): Promise<IGenericResponse<any>> {
    try {
      const res = await this.cloudinaryV2.api.delete_resources(fileIds);
      return ApiResponse.success('files deleted', HttpStatus.OK, res);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async getAllFiles(
    query,
    conditions = [],
  ): Promise<IGenericResponse<QueryReturn<any>>> {
    try {
      const files = await find(this.fileModel, query, conditions);
      return ApiResponse.success<any>('files fetched', HttpStatus.OK, files);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
