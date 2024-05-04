import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { TestimonialDTO, UpdateTestimonialDTO } from './dtos/testimonial.dto';
import { QueryOptions } from 'mongoose';

@Controller('testimonial')
export class TestimonialController {

    constructor(private testimonialService: TestimonialService){}

    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post()
    async createTestimonial(
        @Body() payload: TestimonialDTO
    ){
        return this.testimonialService.createTestimonial(payload);
    }
    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Put()
    async updateTestimonial(
        @Body() payload: UpdateTestimonialDTO
    ){
        return this.testimonialService.updateTestimonial(payload);
    }

    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/:testimonialId")
    async getTestimonial(
        @Param("testimonialId") testimonialId: string
    ){
        return this.testimonialService.getTestimonial(testimonialId)
    }
    

    
    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Get("/testimonials")
    async getTestimonials(
        @Query() payload: QueryOptions
    ){
        return this.testimonialService.findTestimonials(payload)
    }
    
}
