import { AuthService } from './auth.service'; // ajuste o caminho conforme necessário
import { AuthDTO } from './dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from '@app/core/adapters/bcrypt';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from './schema/user.schema';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserRegisterDTO } from './dto/user-register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<UserEntity>;
  let bcryptAdapter: BcryptAdapter;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(UserEntity.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: BcryptAdapter,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
    bcryptAdapter = module.get<BcryptAdapter>(BcryptAdapter);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('deve retornar um token ao fazer login', async () => {
      const userMock = {
        email: 'test@example.com',
        password: 'hashed_password',
        username: 'testUser',
      };

      const authDto: AuthDTO = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      jest.spyOn(authService, 'getUser').mockResolvedValue(userMock as any);
      jest.spyOn(bcryptAdapter, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mock_token');

      const result = await authService.signIn(authDto);

      expect(result).toEqual({ token: 'mock_token' });
      expect(authService.getUser).toHaveBeenCalledWith(authDto.email);
      expect(bcryptAdapter.compare).toHaveBeenCalledWith(authDto.password, userMock.password);
    });

    it('deve lançar UnauthorizedException se as credenciais forem inválidas', async () => {
      const authDto: AuthDTO = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      jest.spyOn(authService, 'getUser').mockResolvedValue({
        email: 'test@example.com',
        password: 'hashed_password',
      } as any);

      jest.spyOn(bcryptAdapter, 'compare').mockResolvedValue(false);

      await expect(authService.signIn(authDto)).rejects.toThrow(UnauthorizedException);
    });
  });

});
