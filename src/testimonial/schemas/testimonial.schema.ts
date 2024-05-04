import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "../../user/schemas/user.schema"; 

export type TestimonialDocument = Testimonial & Document
@Schema({timestamps: true})
export class Testimonial {
    
    @Prop({
        type: String,
        required: true
    })
    testimonialName: string;

    @Prop({
        type: String,
    })
    detail?: string;

    
    @Prop({
        type: String,
    })
    avatar?: string;

    @Prop({
        type: Types.ObjectId,
        ref: User.name
    })
    lastManagedBy?: Types.ObjectId;

    @Prop({
        type: [Types.ObjectId],
        ref: User.name,
    })
    users: string;
    
    @Prop({
        type: String,
    })
    contactName?: string;
    
    @Prop({
        type: String,
    })
    contactEmail?: string;
    

    @Prop({
        type: String,
    })
    contactPhoneNumber?: string;
    

    
    @Prop({
        type: String,
    })
    contactAddress?: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);