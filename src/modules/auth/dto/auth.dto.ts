import { PickType } from '@nestjs/swagger';

import { UserEntity } from '../schema/user.schema';

export class AuthDTO extends PickType(UserEntity, ['email', 'password'] as const) {}
