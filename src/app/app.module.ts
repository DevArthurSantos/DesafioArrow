import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { envs } from '@app/core/configuration/envs';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ApiModule } from 'src/modules/post/post.module';
import { RedditModule } from 'src/modules/reddit/reddit.module';

const mongodbUrl = envs.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error('MONGODB_URL is not defined in the environment variables');
}

@Module({
  imports: [AuthModule, RedditModule, ApiModule, MongooseModule.forRoot(mongodbUrl)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
