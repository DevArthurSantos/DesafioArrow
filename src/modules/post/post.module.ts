import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserEntity, UserSchema } from '../auth/schema/user.schema';
import { PostEntity, PostSchema } from '../reddit/schema/post.schema';
import { ApiController } from './post.controller';
import { ApiService } from './post.service';

import { BcryptAdapter } from '@app/core/adapters/bcrypt';
import { JwtStrategy } from '@app/core/passports/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostEntity.name, schema: PostSchema },
      { name: UserEntity.name, schema: UserSchema },
    ]),
  ],
  controllers: [ApiController],
  providers: [JwtStrategy, BcryptAdapter, ApiService],
})
export class ApiModule {}
