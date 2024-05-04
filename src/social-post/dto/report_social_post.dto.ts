import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SocialPostReportDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty()
  @IsString()
  socialPostId: string;

  @ApiProperty()
  @IsString()
  reason: string;
}
