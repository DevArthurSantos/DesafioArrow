import { Test, type TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return the correct response from DesafioArrow', () => {
    const result = {
      company: 'Desafio Arrow',
      version: '1.0',
    };
    expect(appController.DesafioArrow()).toEqual(result);
  });
});
