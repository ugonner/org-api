import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { Cluster } from "../../cluster/schemas/cluster.schema";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true
    })
    email: string;
    @Prop({
        type: Boolean,
        required: true,
        default: true,
    })
    emailVerified: boolean;
    
    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: String,
        required: true,
    })
    firstName: string;

    
    @Prop({
        type: String,
        required: true,
    })
    lastName: string;

    
    @Prop({
        type: String,
    })
    phoneNumber?: string;

    
    @Prop({
        enum: ["M", "F"],
        type: String,
    })
    gender?: string;

    
    @Prop({
        type: String,
    })
    address?: string;

    @Prop({
        type: String,
    })
    dateOfBirth?: string;

    
   
    @Prop({
        type: String,
    })
    avatar?: string;

    @Prop({
        type: [String],
    })
    role: string[];

    @Prop({
        enum: ["suspended", "deactivated", "active"],
        type: String,
        default: "active"
    })
    status: "suspended" | "deactivated" | "active"

    @Prop({
        type: [Types.ObjectId],
        ref: Cluster.name
    })
    clusters: string[];

    @Prop({
        type: String
    })
    about: string;
    @Prop({
        type: String
    })
    position: string;
    @Prop({
        type: String
    })
    positionNote: string;
    
    @Prop({
        type: String
    })
    memberType: string;
}

export const UserSchema = SchemaFactory.createForClass(User)