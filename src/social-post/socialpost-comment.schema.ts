import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, Document } from 'mongoose';
import { MediaFile } from '../shared/file/media-file.schema';
import { Socialpost } from './schema/socialpost.schema';
import { User } from '../user/schemas/user.schema';
export type SocialpostCommentDocument = SocialpostComment & Document;

@Schema({ timestamps: true })
export class SocialpostComment {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: string;

  @Prop({
    type: Types.ObjectId,
    ref: Socialpost.name
  })
  socialpost: string;

  @Prop({
    type: [Types.ObjectId],
    ref: User.name
  })
  likedBy: string[];

  @Prop({
    type: mongoose.Schema.Types.Number,
  })
  noOfLikes: number;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop({
    type: () => [MediaFile],
  })
  attachment: MediaFile[];
}

export const SocialpostCommentSchema =
  SchemaFactory.createForClass(SocialpostComment);
