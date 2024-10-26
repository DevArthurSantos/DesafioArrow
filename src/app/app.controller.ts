import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
export class AppController {
  @ApiTags('Desafio Arrow API')
  @Get('')
  DesafioArrow() {
    return {
      company: 'Desafio Arrow',
      version: '1.0',
    };
  }
}
