import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TokenDocument = mongoose.HydratedDocument<Token>;

@Schema({ timestamps: true })
export class Token {
  @Prop({
    type: String,
    required: true,
  })
  token: string;

  @Prop({
    type: String,
    enum: ['signupVerification', 'resetPassword'],
    required: true,
  })
  tokenType: string;


  @Prop({
    type: String,
  })
  user: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  expired: boolean;

  @Prop({
    type: Number,
    default: 10 * 60 * 1000,
  })
  expiresIn: number;
}

// expire after 10 minutes
// tokenSchema.index(
//   {
//     expireAt: 1, // 1 means ascending
//   },
//   {
//     expireAfterSeconds: 0, // 0 means never expire
//   },
// );

export const TokenSchema = SchemaFactory.createForClass(Token);
