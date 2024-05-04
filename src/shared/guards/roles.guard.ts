import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const user = request.user;
      //check roles with the auth service using userId
      if (roles.includes(user.role)) return true;
    }
    // return false;
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'You are not logged in with the right role to access this route!!',
        message: 'You are not logged in with the right role to access this route!!',
      },
      HttpStatus.UNAUTHORIZED,
    );
    return false;
  }
}
