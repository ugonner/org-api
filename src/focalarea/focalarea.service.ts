import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, QueryOptions, Schema } from 'mongoose';
import { Focalarea, FocalareaDocument } from './schemas/focalarea.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FocalareaDTO, UpdateFocalareaDTO } from './dtos/focalarea.dto';
import { ApiResponse, IGenericResponse } from "../shared/apiResponse";
import { QueryReturn, find } from '../shared/utils/db';
import { User } from '../user/schemas/user.schema';
import { DBUtils } from '../shared/utils/db/db_commands';
import { ISearchDTO } from '../shared/interfaces';



@Injectable()
export class FocalareaService {
    constructor(
        @InjectModel(Focalarea.name)
        private focalareaModel: Model<FocalareaDocument>
    ){}

    async createFocalarea(dto: FocalareaDTO): Promise<IGenericResponse<FocalareaDocument>> {
        try{
            const focalarea = await this.focalareaModel.create(dto);
            return ApiResponse.success("focalarea created", HttpStatus.CREATED, focalarea)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async updateFocalarea(dto: UpdateFocalareaDTO): Promise<IGenericResponse<FocalareaDocument>> {
        try{
            const focalarea = await this.focalareaModel.findByIdAndUpdate(dto.focalareaId, dto, {new: true});
            if(!focalarea) return ApiResponse.fail("no such focalarea found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("focalarea updated", HttpStatus.OK, focalarea)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async getFocalarea(focalareaId: string): Promise<IGenericResponse<FocalareaDocument>> {
        try{
            const focalarea = await this.focalareaModel.findById(focalareaId)
            .populate(`lastManagedBy`, {firstName: 1, avatar: 1}, User.name)
            //.populate(`users`, {firstName: 1, avatar: 1}, User.name);

            if(!focalarea) return ApiResponse.fail("no such focalarea found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("focalarea updated", HttpStatus.OK, focalarea)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
       
    }

    searchFields = [
        "focalareaName",
        "contactAddress"
    ]

    async findFocalareas(query: QueryOptions): Promise<IGenericResponse<QueryReturn<FocalareaDocument>>> {
        try{

            query._populate = [`lastManagedBy`];
            

            const searchDto: ISearchDTO<FocalareaDocument> = {
                baseModel: this.focalareaModel, 
                searchTerm: query._searchBy,
                searchFields: this.searchFields,
                populateFields: ["lastManagedBy"],
                page: query._page ?? 0
            }
            
            const focalareas = query._searchBy ? await DBUtils.searchItem(searchDto) : await find(this.focalareaModel, query);
            return ApiResponse.success("focalarea updated", HttpStatus.OK, focalareas as any)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
}
