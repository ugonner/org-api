import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDateString, IsEmail, IsEnum, IsOptional, IsString, isEmail, isString } from "class-validator";

export class UserDTO {
    @ApiProperty()
    @IsEmail({})
    @IsString()
    email: string;
    
    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    firstName: string;

    
    @ApiProperty()
    @IsString()
    lastName: string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    
    @ApiPropertyOptional()
    @IsEnum(["M", "F"], {message: `gender must be one of 'M". 'f'`})
    @IsString()
    @IsOptional()
    gender?: string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    address?: string;

    

    
    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    
   
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar?: string;

    
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    about?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    position: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    positionNote: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    memberType: string;
}

export class UpdateUserDTO {
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsOptional()
    userId?: string;

    
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    phoneNumber?: string;

    
    @ApiPropertyOptional()
    @IsEnum(["M", "F"], {message: `gender must be one of 'M". 'f'`})
    @IsString()
    @IsOptional()
    gender?: string;

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    address?: string;

    

    
    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    
   
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    avatar?: string;
    @ApiPropertyOptional()
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    clusters?: string[];
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    about?: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    position: string;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    positionNote: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    memberType: string;

}