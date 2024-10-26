import { SetMetadata } from '@nestjs/common';

import { type UserTypeEnum } from '../enums/UserTypeEnum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypeEnum[]) => SetMetadata(ROLES_KEY, roles);
