import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CategoryDTO {
    @ApiProperty()
    @IsString()
    categoryName: string;

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

export class UpdateCategoryDTO extends CategoryDTO {    
    @ApiProperty()
    @IsString()
    categoryId: string;

    
    @ApiProperty()
    @IsString()
    lastManagedBy: string;
}