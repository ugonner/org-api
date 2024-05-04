import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ClusterDTO {
    @ApiProperty()
    @IsString()
    clusterName: string;

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
    contactPhoneNumber?: string;
    

    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contactAddress?: string;
}

export class UpdateClusterDTO extends ClusterDTO {    
    @ApiProperty()
    @IsString()
    clusterId: string;

    
    @ApiProperty()
    @IsString()
    lastManagedBy: string;
}