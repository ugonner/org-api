import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "../../user/schemas/user.schema"; 
import { Socialpost } from "../../social-post/schema/socialpost.schema";

export type FocalareaDocument = Focalarea & Document
@Schema({timestamps: true})
export class Focalarea {
    
    @Prop({
        type: String,
        required: true
    })
    focalareaName: string;

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
    lastManagedBy?: string;

    @Prop({
        type: [Types.ObjectId],
        ref: Socialpost.name,
    })
    posts: string[];
    
}

export const FocalareaSchema = SchemaFactory.createForClass(Focalarea);