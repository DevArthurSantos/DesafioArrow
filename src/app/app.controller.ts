import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('')
export class AppController {
  @ApiTags('Desafio Arrow API')
  @Get('')
  @ApiResponse({ status: 200, description: 'Retorna as informações sobre a API.' })
  DesafioArrow() {
    return {
      company: 'Desafio Arrow',
      version: '1.0',
    };
  }
}
