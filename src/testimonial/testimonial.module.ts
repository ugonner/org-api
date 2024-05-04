import { Module } from '@nestjs/common';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Testimonial, TestimonialSchema } from './schemas/testimonial.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Testimonial.name, schema: TestimonialSchema}
    ])
  ],
  controllers: [TestimonialController],
  providers: [TestimonialService]
})
export class TestimonialModule {}
