import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SocialPostReportDocument = SocialPostReport & Document;
@Schema({ timestamps: true })
export class SocialPostReport {
  @Prop()
  user: string;

  @Prop()
  socialPostId: string;

  @Prop()
  reason: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  resolved: boolean;
}

export const SocialPostReportSchema = SchemaFactory.createForClass(SocialPostReport);
