import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, Document } from 'mongoose';
import { MediaFile } from '../../shared/file/media-file.schema';
import { Cluster } from '../../cluster/schemas/cluster.schema';
import { User } from '../../user/schemas/user.schema';
import { Category } from '../../categories/schemas/category.schema';
import { Focalarea } from '../../focalarea/schemas/focalarea.schema';
export type SocialpostDocument = Socialpost & Document;

@Schema({ timestamps: true })
export class Socialpost {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name  
  })
  user: string;

  @Prop({
    type: [Types.ObjectId],
  })
  comments: string[];

  @Prop({
    type: [Types.ObjectId],
  })
  likedBy: string[];

  @Prop({
    type: mongoose.Schema.Types.Number,
    default: 0,
  })
  noOfLikes: number;

  @Prop({
    type: mongoose.Schema.Types.Number,
    default: 0,
  })
  noOfComments: number;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: () => MediaFile,
  })
  media: MediaFile;

  @Prop({
    default: false,
  })
  westernContent: boolean;

  @Prop({
    type: String
  })
  thumbnailUrl: string;

  

  @Prop({
    type: String
  })
  shortCode: string

  @Prop({
    type: String
  })
  datePublished: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isPublished: boolean;

  @Prop({
    type: [Types.ObjectId],
    ref: Cluster.name
  })
  clusters: Types.ObjectId[]

  @Prop({
    type: [Types.ObjectId],
    ref: "Focalarea"
  })
  focalareas: Types.ObjectId[]

  @Prop({
    type: [Types.ObjectId],
    ref: Category.name
  })
  categorys: Types.ObjectId[]


  
  @Prop({
    type: () => [MediaFile],
  })
  attachment: MediaFile[];
  @Prop({
    type: String
  })
  title: string;

  @Prop({
    type: Number,
    default: 0
  })
  noOfViews: number;
}

export const SocialpostSchema = SchemaFactory.createForClass(Socialpost);
