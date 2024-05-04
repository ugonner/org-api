import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Model, Query } from "mongoose";

export class PeopleDTO {
    @ApiProperty()
    @IsString()
    property: string;

    @ApiProperty()
    @IsNumber()
    offset: number;

    @ApiProperty()
    @IsNumber()
    limit: number;

    @ApiProperty()
    @IsString()
    id: string;
}

export class AddOrRemoveFromGroupDTO <T>{
    

    @ApiProperty()
    @IsString()
    primaryId: string;

    

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    propertyName?: string;

    

    @ApiProperty()
    @IsString()
    propertyValue: T;

    

    @ApiProperty()
    @IsBoolean()
    forwardAction: boolean;
    
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    primaryIncrementField?: string;
    
    
}



export class AddOrRemoveFromGroupManyToManyDTO {
    @ApiProperty()
    @IsString()
    primaryId: string;
    
    @ApiProperty()
    @IsString()
    secondaryId: string;
    
    @ApiProperty()
    @IsString()
    primaryPropertyName: string;
    
    @ApiProperty()
    @IsString()
    secondaryPropertyName: string;
    
    @ApiProperty()
    @IsString()
    primaryPropertyValue: string;
    
    @ApiProperty()
    @IsString()
    secondaryPropertyValue: string;
    
    @ApiProperty()
    @IsBoolean()
    forwardAction: boolean;
  
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    primaryIncrementField?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    secondaryIncrementField?: string;
}

export class GetInstancePropertyMembersDTO {
    @ApiProperty()
    @IsString()
    primaryId: string;
    
    @ApiProperty()
    @IsString()
    property: string;
    
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    offset? = 0;
    
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    limit? = 0
}

export interface IGetInstancePopulatedMembersResult <TBaseModelDocumentType, TForeignModelDocumentType>{
    totalCount: number;
    docs: TForeignModelDocumentType[],
    baseDoc?: TBaseModelDocumentType
}

export interface ISearchDTO <TBaseModelDocumentType>{
    baseModel: Model<TBaseModelDocumentType>,
    searchFields: string[];
    searchTerm: string;
    populateFields: string[];
    page?: number;
}
export interface ICountDTO <TBaseModelDocumentType>{
    baseModel: Model<TBaseModelDocumentType>,
    query: Query<TBaseModelDocumentType, TBaseModelDocumentType>,
}

export class GetEntitiesFromModelArrayPropertyDTO {
    @ApiProperty()
    @IsString()
    basePrimaryId: string;
    
    @ApiProperty()
    @IsString()
    arrayPropertyName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    _page?: number;
    
    @ApiProperty()
    @IsNotEmpty()
    _limit?: number
  }