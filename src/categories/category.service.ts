import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, QueryOptions, Schema } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';
import { ApiResponse, IGenericResponse } from "../shared/apiResponse";
import { QueryReturn, find } from '../shared/utils/db';
import { User } from '../user/schemas/user.schema';
import { DBUtils } from '../shared/utils/db/db_commands';
import { ISearchDTO } from '../shared/interfaces';



@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>
    ){}

    async createCategory(dto: CategoryDTO): Promise<IGenericResponse<CategoryDocument>> {
        try{
            const category = await this.categoryModel.create(dto);
            return ApiResponse.success("category created", HttpStatus.CREATED, category)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async updateCategory(dto: UpdateCategoryDTO): Promise<IGenericResponse<CategoryDocument>> {
        try{
            const category = await this.categoryModel.findByIdAndUpdate(dto.categoryId, dto, {new: true});
            if(!category) return ApiResponse.fail("no such category found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("category updated", HttpStatus.OK, category)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async getCategory(categoryId: string): Promise<IGenericResponse<CategoryDocument>> {
        try{
            const category = await this.categoryModel.findById(categoryId)
            .populate(`lastManagedBy`, {firstName: 1, avatar: 1}, User.name)
            //.populate(`users`, {firstName: 1, avatar: 1}, User.name);

            if(!category) return ApiResponse.fail("no such category found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("category updated", HttpStatus.OK, category)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
       
    }

    searchFields = [
        "categoryName",
        "contactAddress"
    ]

    async findCategorys(query: QueryOptions): Promise<IGenericResponse<QueryReturn<CategoryDocument>>> {
        try{

            query._populate = [`lastManagedBy`];
            

            const searchDto: ISearchDTO<CategoryDocument> = {
                baseModel: this.categoryModel, 
                searchTerm: query._searchBy,
                searchFields: this.searchFields,
                populateFields: ["lastManagedBy"],
                page: query._page ?? 0
            }
            
            const categorys = query._searchBy ? await DBUtils.searchItem(searchDto) : await find(this.categoryModel, query);
            return ApiResponse.success("category updated", HttpStatus.OK, categorys as any)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
}
