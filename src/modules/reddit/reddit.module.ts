import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AxiosService } from '../axios/axios.service';
import { RedditService } from './reddit.service';
import { PostEntity, PostSchema } from './schema/post.schema';

import { BcryptAdapter } from '@app/core/adapters/bcrypt';
import { JwtStrategy } from '@app/core/passports/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]), ScheduleModule.forRoot()],
  controllers: [],
  providers: [JwtStrategy, BcryptAdapter, RedditService, AxiosService],
})
export class RedditModule {}
