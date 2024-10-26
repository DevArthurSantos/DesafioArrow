import { Injectable, type CanActivate, type ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';

import { ROLES_KEY } from '../decorators/role';
import { type UserTypeEnum } from '../enums/UserTypeEnum';

import { Model } from 'mongoose';
import { UserEntity } from 'src/modules/auth/schema/user.schema';

interface CachedUser {
  user: UserEntity;
  expiresAt: number;
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly cache = new Map<string, CachedUser>();
  private readonly cacheDuration = 10000;

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
    private readonly reflector: Reflector
  ) {
    setInterval(() => {
      this.clearCache();
    }, this.cacheDuration);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserTypeEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const userId = user.id;

    const tempUser = await this.getUserWithCache(userId);

    if (!tempUser) throw new ForbiddenException('Usuário não encontrado.');

    const hasRole = requiredRoles.includes(tempUser.user_type);

    if (!hasRole) throw new ForbiddenException('Você não pode acessar este recurso.');

    return true;
  }

  private async getUserWithCache(userId: string): Promise<UserEntity | null> {
    const cached = this.cache.get(userId);

    if (cached && Date.now() < cached.expiresAt) {
      return cached.user;
    }

    const user = await this.userModel.findById(userId).select('user_type _id').exec();

    if (user) {
      this.cache.set(userId, {
        user,
        expiresAt: Date.now() + this.cacheDuration,
      });
    }

    return user;
  }

  public clearCache(): void {
    const now = Date.now();

    this.cache.forEach((cachedUser, userId) => {
      if (cachedUser.expiresAt <= now) {
        this.cache.delete(userId);
      }
    });
  }
}
