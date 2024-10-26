import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { type UserTypeEnum } from '../enums/UserTypeEnum';
import { JwtAuthGuard } from '../guards/jwt';
import { RolesGuard } from '../guards/role';

export function Auth(...roles: UserTypeEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
}
