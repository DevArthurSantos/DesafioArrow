import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { type UserTypeEnum } from '../enums/UserTypeEnum';

import { ExtractJwt, Strategy } from 'passport-jwt';

export interface TokenDecrypt {
  user_id: string;
  user_type: UserTypeEnum;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.user_id,
      user_type: payload.user_type,
    };
  }
}
