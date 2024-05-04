import { HttpStatus, Injectable } from '@nestjs/common';
import { Model, QueryOptions } from 'mongoose';
import { Testimonial, TestimonialDocument } from './schemas/testimonial.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TestimonialDTO, UpdateTestimonialDTO } from './dtos/testimonial.dto';
import { ApiResponse, IGenericResponse } from '../shared/apiResponse';
import { QueryReturn, find } from '../shared/utils/db';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class TestimonialService {
    constructor(
        @InjectModel(Testimonial.name)
        private testimonialModel: Model<TestimonialDocument>
    ){}

    async createTestimonial(dto: TestimonialDTO): Promise<IGenericResponse<TestimonialDocument>> {
        try{
            const testimonial = await this.testimonialModel.create(dto);
            return ApiResponse.success("testimonial created", HttpStatus.CREATED, testimonial)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }

    async updateTestimonial(dto: UpdateTestimonialDTO): Promise<IGenericResponse<TestimonialDocument>> {
        try{
            const testimonial = await this.testimonialModel.findByIdAndUpdate(dto.testimonialId, dto, {new: true});
            if(!testimonial) return ApiResponse.fail("no such testimonial found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("testimonial updated", HttpStatus.OK, testimonial)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
    async getTestimonial(testimonialId: string): Promise<IGenericResponse<TestimonialDocument>> {
        try{
            const testimonial = await this.testimonialModel.findById(testimonialId)
            
            .populate(`lastManagedBy`, {firstName: 1, avatar: 1}, User.name)
            .populate(`users`, {firstName: 1, avatar: 1}, User.name);
            
            if(!testimonial) return ApiResponse.fail("no such testimonial found", HttpStatus.NOT_FOUND);

            return ApiResponse.success("testimonial updated", HttpStatus.OK, testimonial)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
      
    }

    async findTestimonials(query: QueryOptions): Promise<IGenericResponse<QueryReturn<TestimonialDocument>>> {
        try{
            query._populate = [`lastManagedBy`,`users`]
            const testimonials = await find(this.testimonialModel, query);

            return ApiResponse.success("testimonial updated", HttpStatus.OK, testimonials)
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
        }
    }
}
