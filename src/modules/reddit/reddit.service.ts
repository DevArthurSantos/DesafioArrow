/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable new-cap */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';

import { AxiosService } from '../axios/axios.service';
import { type PostDocument, PostEntity } from './schema/post.schema';

import { Model } from 'mongoose';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel(PostEntity.name)
    private readonly postModel: Model<PostDocument>,
    private readonly axiosService: AxiosService
  ) {}

  @Cron('04 16 * * *', { timeZone: 'America/Sao_Paulo' })
  async handleCron() {
    await this.fetchAndStoreHotPosts();
  }

  async fetchAndStoreHotPosts() {
    try {
      const response = await this.axiosService.Get('https://www.reddit.com/r/artificial/hot.json');
      const children = response.data.data.children;

      const postPromises = children.map(async ({ data: { title, author, created_utc, ups, num_comments } }) => {
        const post = new this.postModel({
          title,
          author,
          post_created_at: new Date(created_utc * 1000),
          ups,
          num_comments,
        });
        return await post.save();
      });

      await Promise.all(postPromises);
    } catch (error) {
      Logger.log('Erro ao consultar API do Reddit:', error.message);
    }
  }
}
