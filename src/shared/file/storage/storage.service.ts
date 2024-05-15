import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v2, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as fs from 'fs';
import * as filestack from 'filestack-js';
import * as toStream from 'buffer-to-stream';
import * as path from 'path';
import * as firebase from 'firebase-admin';

import { S3 } from 'aws-sdk';
import { ApiResponse } from '../../apiResponse'; 
import { IFile } from '../dto/file.dto';
import { promisify } from 'util';
import { isArray } from 'class-validator';

@Injectable()
export class StorageService {
  cloudinaryV2 = v2;
  private fB = firebase;
  private fileStack

  constructor() {
    //set up filestacke
    this.fileStack = filestack.init('A3ofgMrjSCK8ceFcElUAkz');

    this.cloudinaryV2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECURITY_ACCESS_Key,
    });
  }

  async uploadS3(
    file: Express.Multer.File | fs.ReadStream,
    uniqueIdentifier: string,
    fileInfo: { fileSourceDataType: 'uploaded' | 'stream'; fileExtension?: string } = {
      fileSourceDataType: 'uploaded', fileExtension: ""
    },
  ): Promise<IFile>{
    const s3 = this.getS3();
    let params;
    if (fileInfo.fileSourceDataType === 'uploaded') {
      if(/video/i.test((file as Express.Multer.File).mimetype)){
        fileInfo.fileExtension = ".mp4";
      } else if(/image/i.test((file as Express.Multer.File).mimetype)){
        fileInfo.fileExtension = ".jpg";
      }
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uniqueIdentifier}/${Date.now()}/${
          (file as Express.Multer.File).originalname
        }${fileInfo.fileExtension}`,
        Body: toStream((file as Express.Multer.File).buffer),
      };
    } else if (fileInfo.fileSourceDataType === 'stream') {
      if (!fileInfo.fileExtension)
        return ApiResponse.fail(
          'no file extension specified',
          HttpStatus.BAD_REQUEST,
        ) as any;
      params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uniqueIdentifier}${fileInfo.fileExtension}`,
        Body: file as fs.ReadStream,
      };
    }
    
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
      const fileObject: IFile = {
        fileId: data.Key,
        url: data.Location,
        secureUrl: data.Location,
        userId: null,
        fileType: (file as Express.Multer.File).mimetype ?? 'image',
        sourceType: fileInfo.fileSourceDataType,
      };
        resolve(fileObject);
      });
    });
  }

  async uploadFileWithCloudinary(
    file: Express.Multer.File,
    userId: string,
    folder = '/uploads/',
  ): Promise<IFile> {
    return new Promise(async (resolve, reject) => {
      // if folder indicates profile images; then compress
      // const data = /profile/i.test(folder)
      //   ? await sharp(file.buffer).webp({ quality: 20 }).toBuffer()
      //   : file.buffer;
      const data = file.buffer;
      const uploadFileFunction = this.cloudinaryV2.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) return reject(error);
          const fileObj: IFile = {
            fileId: result.public_id,
            fileType: result.resource_type,
            secureUrl: result.secure_url ?? result.url,
            url: result.secure_url ?? result.url,
            userId,
            sourceType: "cloudinary"
          }
          return resolve(fileObj);
        },
      );

      toStream(data).pipe(uploadFileFunction);
    });
  }

  async uploadWithFirebase(file: Express.Multer.File) {
    try {
      const filePath = path.join(__dirname, file.originalname);
      const storePromise = new Promise((res, rej) => {
        const writer = fs.createWriteStream(filePath, { flags: 'w' });
        writer.on('finish', async () => {
          const storedFile = await this.fB
            .storage()
            .bucket()
            .upload(filePath, { gzip: true });
          console.log('storage result', storedFile);
          res(storedFile);
        });
        writer.on('error', (error) => {
          rej(error);
        });
        writer.on('pipe', () => console.log('piping'));
        writer.on('unpipe', () => console.log('un piping un piped'));
        toStream(file.buffer).pipe(writer);
      });
      const storedFileResult = await storePromise;
      console.log('resoulg', storedFileResult);
      return ApiResponse.success('stored', HttpStatus.OK, storedFileResult);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async uploadFileLocalDisk(
    file: Express.Multer.File,
    userId: string
  ): Promise<IFile>{
    return new Promise((resolve, reject) => {
      let folder = "images";
      if(/video/i.test(file.mimetype)){
        folder = "videos";
      }else if(/audio/i.test(file.mimetype)){
        folder = "audios";
      }else if(/image/i.test(file.mimetype)){
        folder = "images";
      }else {
        folder = "others";
      }

      const fileName =  `${Date.now()}${file.originalname}`;
      const filePath = path.join(__dirname, "..", "..", "..","..", "public", folder,"uploads",`${fileName}`);
      const fileObj: IFile = {
        fileId: fileName,
        fileType: file.mimetype,
        filePath,
        userId,
        sourceType: "local",
        url: `${process.env.APP_URL}/${folder}/uploads/${fileName}`,
        secureUrl: `${process.env.APP_URL}/${folder}/uploads/${fileName}`
      }
      const writeFileStream = fs.createWriteStream(filePath);
      writeFileStream.on("error", (err) => {
        console.log("error saving file", err.message)
        fs.unlink(filePath, () => console.log("file deleted failded to write to file"))
        reject(err)
      })
      writeFileStream.on("finish", () => {
        console.log("done weriting file")
        resolve(fileObj)
      })
      toStream(file.buffer).pipe(writeFileStream)

      })
  }

  async uploadFileWithFilestack(file: Express.Multer.File) {
    try {
      const filePath = path.join(__dirname, file.originalname);
      const storePromise = new Promise((res, rej) => {
        const writer = fs.createWriteStream(filePath, { flags: 'w' });
        writer.on('finish', async () => {
          const storedFile = await filestack
            .init('A3ofgMrjSCK8ceFcElUAkz')
            .upload(filePath);
          console.log('storage result', storedFile);
          res(storedFile);
        });
        writer.on('error', (error) => {
          rej(error);
        });
        writer.on('pipe', () => console.log('piping'));
        writer.on('unpipe', () => console.log('un piping un piped'));
        toStream(file.buffer).pipe(writer);
      });
      const storedFileResult = await storePromise;
      console.log('resoulg', storedFileResult);
      return ApiResponse.success('stored', HttpStatus.OK, storedFileResult);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async 

  async deleteFilesFromS3(fileKeys: any[]) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: fileKeys.map((key) => ({ Key: key })),
        Quiet: false, // Set to true to suppress response data (optional)
      },
    };
    this.getS3().deleteObjects(params, function (err, data) {
      if (err) {
        console.error('Error deleting files:', err);
      } else {
        console.log('Deleted files:', data.Deleted);
      }
    });
  }


  async deleteFilesFromCloudinary(publicIds: string | string[]): Promise<boolean> {
    
   
    return new Promise((resolve, reject) => {
      if(isArray(publicIds)){
        this.cloudinaryV2.api.delete_resources(
          publicIds, function(error) {
            if(error) reject(error);
            else resolve(true);
          }
        );
      }else if(typeof(publicIds) === "string"){
        this.cloudinaryV2.uploader.destroy(publicIds, function(error, result) {
          if (error) {
            console.error('Error deleting file:', error);
            reject(error);
          } else {
            console.log('File deleted successfully:', result);
            resolve(true)
          }
        });
      }
      
    })
    
  }
  async deleteFileLocal(filePath: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if(err) reject(err)
        resolve(true)
      })
    })
  }

}
