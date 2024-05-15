import {
  UseGuards,
  Controller,
  ParseFilePipe,
  ParseFilePipeBuilder,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  UploadedFiles,
  Get,
  Query,
  Req,
  Delete,
  Body,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { MaxFileSize } from './validators/file-size.validator';
import * as path from 'path';
import { ApiResponse } from '../apiResponse';
import { AdminRoles } from '../decorators/roles.decorator';
import { AdminRolesGuard } from '../guards/admin-roles.guard';
import { DeleteFilesDTO } from './dto/file.dto';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService,
    ) {}

  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(AuthGuard)
  @Post('/upload/profile/:section')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addValidator(new MaxFileSize({ maxSize: 10 }))
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @User('id') userId: string,
    @Param('section') section: string,
  ) {
    const storagePlatform = process.env.NODE_ENV === "development" ? "local": "cloudinary"
    return await this.fileService.uploadFile(file, userId, section, storagePlatform);
  }


  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(AuthGuard)
  @Post('/upload/multiple/:section')
  @UseInterceptors(FilesInterceptor('file[]'))
  async uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          //new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSize({ maxSize: 100 }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @User('id') userId: string,
    @Param('section') section: string,
    @Req() request
  ) {
    console.log("got here")
    const storagePlatform = process.env.NODE_ENV === "development" ? "local": "cloudinary"
    return await this.fileService.uploadMultipleFiles(files, userId, section, storagePlatform);
  }

 
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @UseGuards(AuthGuard)
  @Post('/upload/:section')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSize({ maxSize: 100 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @User('id') userId: string,
    @Param('section') section: string,
  ) {
    const storagePlatform = process.env.NODE_ENV === "development" ? "local": "cloudinary"
    return await this.fileService.uploadFile(file, userId, section, storagePlatform);
  }

  @Get('/')
  async fetchAllfiles(@Query() query) {
    return await this.fileService.getAllFiles(query);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteFiles(
    @Body() payload: DeleteFilesDTO
  ){
    return await this.fileService.deleteFilesByUrl(payload.fileUrls)
  }
}
