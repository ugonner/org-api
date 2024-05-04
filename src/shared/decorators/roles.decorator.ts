import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const AdminRoles = (...roles: string[]) =>
  SetMetadata('admin-roles', roles);
