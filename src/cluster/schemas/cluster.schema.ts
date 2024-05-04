import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export type ClusterDocument = Cluster & Document
@Schema({timestamps: true})
export class Cluster {
    
    @Prop({
        type: String,
        required: true
    })
    clusterName: string;

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
        ref: 'User'
    })
    lastManagedBy?: Types.ObjectId;

    @Prop({
        type: [Types.ObjectId],
        ref: "User"
    })
    users: string;
    
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

export const ClusterSchema = SchemaFactory.createForClass(Cluster);