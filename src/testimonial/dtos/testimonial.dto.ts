import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class TestimonialDTO {
    @ApiProperty()
    @IsString()
    testimonialName: string;

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
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contactEmail?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contactName?: string;
    

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contactPhoneNumber?: string;
    

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contactAddress?: string;
}

export class UpdateTestimonialDTO extends TestimonialDTO {    
    @ApiProperty()
    @IsString()
    testimonialId: string;

    
    @ApiProperty()
    @IsString()
    lastManagedBy: string;
}