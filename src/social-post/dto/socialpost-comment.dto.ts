import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Media } from '../../shared/file/dto/media.dto';
import { Type } from 'class-transformer';

export class CreateSocialpostCommentDTO {
  @ApiProperty()
  @IsString()
  socialpost: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'An array of object of any attached file',
  })
  @ValidateNested({ each: true })
  @Type(() => Media)
  @IsArray()
  @IsOptional()
  attachment?: Media[];
}

export class UpdatePostCommentDTO extends CreateSocialpostCommentDTO {
  @ApiProperty()
  @IsString()
  commentId: string;
}