import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type CategoryDocument = Category & Document
@Schema({timestamps: true})
export class Category {
    
    @Prop({
        type: String,
        required: true
    })
    categoryName: string;

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
    posts: string[];

    @Prop({
        type: Number
    })
    noOfPosts?: number;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);