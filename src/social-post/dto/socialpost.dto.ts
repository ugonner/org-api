import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Media } from '../../shared/file/dto/media.dto'; 
import { Type } from 'class-transformer';

export class SocialpostDTO {
  @ApiProperty()
  @IsString()
  content: string;
  
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  datePublished: string;

  @ApiPropertyOptional({ description: 'An object of any attached file' })
  @ValidateNested()
  @Type(() => Media)
  @IsOptional()
  media: Media;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean

  

  @ApiPropertyOptional({
    description: 'An array of object of any attached file',
  })
  @ValidateNested({ each: true })
  @Type(() => Media)
  @IsArray()
  @IsOptional()
  attachment?: Media[];

  @ApiPropertyOptional()
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  focalareas?: string[]

  @ApiPropertyOptional()
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  clusters?: string[]

  @ApiPropertyOptional()
  @IsString({each: true})
  @IsArray()
  @IsOptional()
  categorys?: string[]

  @ApiProperty()
  @IsString()
  title: string;
}

export class UpdateSocialpostDTO extends SocialpostDTO {
  @ApiProperty()
  @IsString()
  socialpostId: string;
}

export class DeleteAttachmentDTO {
  @ApiProperty()
  @IsEnum(["post", "comment"], {message: "fromFeature can be one of post or comment"})
  @IsString()
  fromFeature: string;

  @ApiProperty()
  @IsArray()
  @IsString({each: true})
  attachmentUrls: string[];

  @ApiProperty({description: "primary id of the entity with the ttachments"})
  @IsString()
  primaryId: string;

}
