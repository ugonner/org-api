import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';
import { QueryOptions } from 'mongoose';
import { AuthGuard } from '../shared/guards/auth.guard';
import { User } from '../shared/decorators/user.decorator';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @UseGuards(AuthGuard)
    @Post()
    async createCategory(
        @Body() payload: CategoryDTO,
        @User("id") userId: string
    ){
        payload.lastManagedBy = userId
        return this.categoryService.createCategory(payload);
    }
    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Put()
    async updateCategory(
        @Body() payload: UpdateCategoryDTO
    ){
        return this.categoryService.updateCategory(payload);
    }

    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/categorys")
    async getCategorys(
        @Query() payload
    ){
        return this.categoryService.findCategorys(payload)
    }
 
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/:categoryId")
    async getCategory(
        @Param("categoryId") categoryId: string
    ){
        return this.categoryService.getCategory(categoryId)
    }   
}
