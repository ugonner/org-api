import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MediaFileDocument = MediaFile & Document;
@Schema({ timestamps: true })
export class MediaFile {
  @Prop({
    type: String,
    required: true,
  })
  mediaUrl: string;

  @Prop({
    type: String,
    //enum: ['audio', 'picture', 'video'],
    required: true,
  })
  mediaType: string;

  @Prop({
    type: Types.ObjectId,
  })
  mediaId?: string | Types.ObjectId;

  @Prop()
  mediaSecureUrl?: string;
}

export const MediaFileSchema = SchemaFactory.createForClass(MediaFile);
