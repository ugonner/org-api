import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FocalareaDTO {
    @ApiProperty()
    @IsString()
    focalareaName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    detail?: string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lastManagedBy?: string;
    
}

export class UpdateFocalareaDTO extends FocalareaDTO {    
    @ApiProperty()
    @IsString()
    focalareaId: string;

    
    @ApiProperty()
    @IsString()
    lastManagedBy: string;
}