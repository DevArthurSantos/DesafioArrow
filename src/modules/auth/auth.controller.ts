import { Body, Controller, Get, HttpCode, Param, Post, Put, Delete, Req, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';
import { UserActiveDTO } from './dto/user-active.dto';
import { UserRegisterDTO } from './dto/user-register.dto';
import { UserEntity } from './schema/user.schema';

import { Auth } from '@app/core/decorators/validate';
import { UserTypeEnum } from '@app/core/enums/UserTypeEnum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @HttpCode(200)
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  @ApiResponse({ status: 200, description: 'Retorna informações do usuário.', type: UserEntity })
  async getCurrentUser(@Req() req): Promise<UserEntity> {
    const { id } = req.user;
    return await this.authService.me(id);
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Retorna um token de autenticação.', type: String })
  @ApiBody({ type: AuthDTO })
  async signIn(@Body() data: AuthDTO): Promise<{ token: string }> {
    return await this.authService.signIn(data);
  }

  @Post('/signup')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Retorna as informações do usuário criado.', type: UserEntity })
  @ApiBody({ type: UserRegisterDTO })
  async signUp(@Body() data: UserRegisterDTO): Promise<UserEntity> {
    return await this.authService.signUp(data);
  }

  @Patch('/activete')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Ativação realizada com sucesso.' })
  @ApiBody({ type: UserActiveDTO })
  async activateUser(@Body() data: UserActiveDTO): Promise<void> {
    await this.authService.activate(data);
  }

  @Delete('/:id')
  @HttpCode(204)
  @Auth(UserTypeEnum.Admin)
  @ApiResponse({ status: 204, description: 'Usuário excluído com sucesso.' })
  @ApiParam({ name: 'id', required: true, description: 'ID do usuário a ser excluído.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.authService.deleteUser(id);
  }
}
