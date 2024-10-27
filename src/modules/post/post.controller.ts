import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { type PostDto } from '../reddit/dto/post.dto';
import { ApiService } from './post.service';

import { Auth } from '@app/core/decorators/validate';
import { UserTypeEnum } from '@app/core/enums/UserTypeEnum';

@ApiTags('Api')
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('post/')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  async getPosts(@Query('page') page: string, @Query('limit') limit: string, ): Promise<PostDto[]> {
    return await this.apiService.getPosts(Number(page), Number(limit));
  }

  @Get('post/by-date')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  async getPostsByDate(@Query('page') page: string, @Query('limit') limit: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<PostDto[]> {
    return await this.apiService.getPostsByDate(Number(page), Number(limit), new Date(startDate), new Date(endDate));
  }

  @Get('post/sorted')
  @Auth(UserTypeEnum.User, UserTypeEnum.Admin)
  async getPostsSorted(@Query('page') page: string, @Query('limit') limit: string, @Query('startDate') startDate: string, @Query('endDate') endDate: string, @Query('order') order: string): Promise<PostDto[]> {
    return await this.apiService.getPostsSorted(Number(page), Number(limit), new Date(startDate), new Date(endDate), order);
  }
}
