import { Body, Controller, Get, HttpCode, Param, Post, Put, Delete, Req, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserActiveDTO } from './dto/user-active.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { type UserEntity } from './schema/user.schema';

import { Auth } from '@app/core/decorators/validate';
import { UserTypeEnum } from '@app/core/enums/UserTypeEnum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @HttpCode(200)
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  async getCurrentUser(@Req() req): Promise<UserEntity> {
    const { id } = req.user;
    return await this.authService.me(id);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() data: AuthDTO): Promise<{ token: string }> {
    return await this.authService.signIn(data);
  }

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() data: UserRegisterDTO): Promise<UserEntity> {
    return await this.authService.signUp(data);
  }

  @Patch('/active/:email/:active_code')
  @HttpCode(200)
  async activateUser(@Param() params: UserActiveDTO): Promise<void> {
    await this.authService.activate(params);
  }

  @Delete('/:id')
  @HttpCode(204)
  @Auth(UserTypeEnum.Admin)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.authService.deleteUser(id);
  }
}
