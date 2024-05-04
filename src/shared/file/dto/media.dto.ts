import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class Media {
    @ApiProperty({ description: 'media type picture or video' })
    //@IsEnum(['audio', 'video', 'picture', 'image'], {message: "mediaType must be one of 'audio', 'video', 'picture', 'image'"})
    @IsString()
    mediaType: string;
  
    @ApiProperty({
      description:
        'url of the media, This value is returned from the file upload endpoint',
    })
    @IsString()
    mediaUrl: string;
  
    @ApiPropertyOptional({
      description:
        'id of the stored file,  This value is returned from the file upload endpoint',
    })
    @IsString()
    @IsOptional()
    mediaId?: string;
  
    @ApiPropertyOptional({
      description:
        'https url of the stored file,  This value is returned from the file upload endpoint',
    })
    @IsString()
    @IsOptional()
    mediaSecureUrl?: string;
  }

  export interface IUploadedMedia{
    id: string;
    fileType?: string;
    secureUrl: string;
    url: string;
  }
  