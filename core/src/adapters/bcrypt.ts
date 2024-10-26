import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptAdapter {
  public async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  public async compare(value: string, toCompare: string): Promise<boolean> {
    return bcrypt.compare(value, toCompare);
  }
}
