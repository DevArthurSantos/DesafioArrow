import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { type PostDto } from '../reddit/dto/post.dto';
import { ApiService } from './post.service';
import { Auth } from '@app/core/decorators/validate';
import { UserTypeEnum } from '@app/core/enums/UserTypeEnum';
import { PostEntity } from '../reddit/schema/post.schema';
import { PostsOrderProps } from '@app/core/types/PostsOrderProps';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  @ApiResponse({ status: 200, description: 'Retorna uma lista de postagens.', type: [PostEntity] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página a ser retornada.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de postagens por página.' })
  async getPosts(@Query('page') page: string, @Query('limit') limit: string): Promise<PostDto[]> {
    return await this.apiService.getPosts(Number(page), Number(limit));
  }

  @Get('by-date')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  @ApiResponse({ status: 200, description: 'Retorna uma lista de postagens por intervalo de datas.', type: [PostEntity] })
  @ApiQuery({ name: 'startDate', required: true, type: String, description: 'Data de início do intervalo.' })
  @ApiQuery({ name: 'endDate', required: true, type: String, description: 'Data de término do intervalo.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página a ser retornada.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de postagens por página.' })
  async getPostsByDate(@Query('page') page: string, @Query('limit') limit: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<PostDto[]> {
    return await this.apiService.getPostsByDate(Number(page), Number(limit), startDate, endDate);
  }

  @Get('sorted')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  @ApiResponse({ status: 200, description: 'Retorna uma lista de postagens ordenadas.', type: [PostEntity] })
  @ApiQuery({ name: 'startDate', required: true, type: String, description: 'Data de início do intervalo.' })
  @ApiQuery({ name: 'endDate', required: true, type: String, description: 'Data de término do intervalo.' })
  @ApiQuery({ name: 'order', required: false, type: String, description: 'Critério de ordenação das postagens.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página a ser retornada.' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de postagens por página.' })
  async getPostsSorted(@Query('page') page: string, @Query('limit') limit: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string, @Query('order') order: PostsOrderProps): Promise<PostDto[]> {
    return await this.apiService.getPostsSorted(Number(page), Number(limit), startDate, endDate, order);
  }
}
