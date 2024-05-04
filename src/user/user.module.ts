import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TokenService } from './tokens/token.service';
import { EmailService } from '../shared/utils/email';
import { Token } from 'aws-sdk';
import { TokenSchema } from './tokens/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Token.name, schema: TokenSchema}
    ])
  ],
  providers: [UserService, AuthService, TokenService, EmailService],
  controllers: [UserController, AuthController]
})
export class UserModule {}
