import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { type AuthDTO } from './dto/auth.dto';
import { type UserActiveDTO } from './dto/user-active.dto';
import { type UserRegisterDTO } from './dto/user-register.dto';
import { type UserDocument, UserEntity } from './schema/user.schema';

import { BcryptAdapter } from '@app/core/adapters/bcrypt';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserDocument>,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService
  ) {}

  convertID(id: string): ObjectId {
    return new ObjectId(id);
  }

  async getUser(identifier: string): Promise<UserEntity> {
    let user;

    if (ObjectId.isValid(identifier)) {
      user = await this.userModel.findById(new ObjectId(identifier)).exec();
    } else {
      user = await this.userModel.findOne({ email: identifier }).exec();
    }

    if (!user || user.deleted_at !== null) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    if (!user.active) {
      throw new UnauthorizedException('Usuário não ativado!');
    }

    return user;
  }

  async me(id: string): Promise<UserEntity> {
    return await this.getUser(id);
  }

  async signUp({ email, password, CPF, TEL, username }: UserRegisterDTO): Promise<UserEntity> {
    if (!email) {
      throw new ConflictException('Dados invalidos!');
    }

    const userExists = await this.userModel.findOne({ email }).exec();

    if (userExists) {
      throw new ConflictException('E-mail já cadastrado em nosso sistema');
    }

    password = await this.bcryptAdapter.hash(password);

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const user = new this.userModel({
      username,
      CPF,
      TEL,
      email,
      password,
      active_code: code,
    });

    await user.save();

    return user;
  }

  async signIn(data: AuthDTO): Promise<{ token: string }> {
    const { email, password } = data;

    const user = await this.getUser(email);

    const match = await this.bcryptAdapter.compare(String(password), user.password);

    if (!match) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const token = await this.jwtService.signAsync({
      email: user.email,
      name: user.username,
      user_id: (user as any)._id,
    });

    return { token };
  }

  async activate({ email, active_code }: UserActiveDTO): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user || user.active_code !== active_code) {
      throw new NotFoundException('Dados informados inválidos!');
    }

    try {
      user.active = true;
      await user.save();
    } catch (err: any) {
      throw new BadRequestException(`Erro: ${err}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    try {
      user.deleted_at = new Date();
      await user.save();
    } catch (err: any) {
      throw new BadRequestException(`Erro: ${err.message}`);
    }
  }
}
