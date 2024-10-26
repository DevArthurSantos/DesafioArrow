import { PickType } from '@nestjs/swagger';

import { UserEntity } from '../schema/user.schema';

export class UserRegisterDTO extends PickType(UserEntity, ['CPF', 'TEL', 'email', 'password', 'username'] as const) {}
