import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  CustomException = new HttpException(
    {
      error: 'You do not have the right admin access to this route!!',
      message: 'You do not have the right admin access to this route!!',
    },
    HttpStatus.UNAUTHORIZED,
  );
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const adminRoles = this.reflector.get<string[]>(
        'admin-roles',
        context.getHandler(),
      );
      const request = context.switchToHttp().getRequest();

      if (request?.user && request.user.adminRoles?.length > 0) {
        const user = request.user;
        if (adminRoles.includes('all-admins')) {
          return true;
        }

        //check roles with the auth service using userId
        for (let i = 0; i < user.adminRoles.length; i++) {
          if (adminRoles.includes(user.adminRoles[i])) {
            return true;
          }
        }
      }
      throw this.CustomException;
    } catch (error) {
      this.CustomException.message = error.mesage;
      console.log('error message', error);
      throw this.CustomException;
    }
    //
    return false;
  }
}
