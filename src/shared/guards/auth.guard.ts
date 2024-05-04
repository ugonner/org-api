import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User, UserSchema } from "../../user/schemas/user.schema" 
@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private reflector: Reflector) {
  //   // super();
  // }
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }
    const user: jwt.JwtPayload = (await this.validateToken(
      request.headers.authorization,
    )) as jwt.JwtPayload;
    const currentUserState = await this.getUser(user.id ?? user._id);

    request.user = currentUserState.success ? {...currentUserState, ...user} : user;


    //update user activity
    return true;
  }

  async validateToken(auth: string) {
    try {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUser(userId: string){
    try {
      const url: string =
        process.env.NODE_ENV === 'production'
          ? process.env.DATABASE_URL
          : process.env.LOCAL_DATABASE_URL;

      const mongooseConn = await mongoose.connect(url);
      const currentUserState = await mongooseConn
        .model(User.name, UserSchema)
        .findById(userId);
      const { _id, role, status } = currentUserState;
      return {success: true, id: _id, role, status }
    }catch(error){
      return {success: false, message: error.mesage};
    }
  }
  
}

export class Jwt {
  static signJWT = (
    payload: string | object | Buffer,
    secret: jwt.Secret | any,
    expiry: any,
  ) =>
    jwt.sign(payload, secret, {
      expiresIn: expiry,
    });

  static decodeJWT: (token: string, secret: jwt.Secret | any) => any = (
    token,
    secret,
  ) => {
    const decoded = jwt.verify(token, secret);
    return decoded;
  };

  async validateToken(auth: string) {
    try {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
