import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;
@Schema({ timestamps: true })
export class File {
  @Prop({
    type: String,
    required: true,
  })
  url: string;
  @Prop({
    type: String,
  })
  secureUrl: string;

  @Prop({
    type: String,
    required: true,
  })
  fileType: string;

  @Prop({
    type: String,
  })
  userId?: string;

  @Prop({
    type: String,
  })
  fileId?: string;

  @Prop({
    type: String,
  })
  name?: string;

  @Prop({
    type: String,
  })
  sourceType: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
