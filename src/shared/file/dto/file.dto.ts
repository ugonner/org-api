import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class FileUploadDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'userId must be a string' })
  userId: string;
}

export interface IFile {
  userId: string;
  fileId: string;
  url: string;
  secureUrl?: string;
  fileType: string;
  filePath?: string;
  sourceType: string;
}

export interface IVideoThumbnailResult extends IFile {
  thumbnailPath?: string;
  videoPath?: string;
}

export class DeleteFilesDTO {
  @ApiProperty()
  @IsUrl({}, { each: true })
  @IsArray()
  fileUrls: string[];
}
