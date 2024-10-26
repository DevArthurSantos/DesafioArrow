import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity, UserSchema } from './schema/user.schema';

import { BcryptAdapter } from '@app/core/adapters/bcrypt';
import { envs } from '@app/core/configuration/envs';
import { JwtStrategy } from '@app/core/passports/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, BcryptAdapter, AuthService],
})
export class AuthModule {}
