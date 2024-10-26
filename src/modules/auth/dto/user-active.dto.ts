import { PickType } from '@nestjs/swagger';

import { UserEntity } from '../schema/user.schema';

export class UserActiveDTO extends PickType(UserEntity, ['email', 'active_code'] as const) {}
