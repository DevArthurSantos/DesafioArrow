import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { type PostDocument, PostEntity } from '../reddit/schema/post.schema';

import { Model } from 'mongoose';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(PostEntity.name)
    private readonly postModel: Model<PostDocument>
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return await this.postModel.find().exec();
  }

  async getPostsByDate(startDate: Date, endDate: Date): Promise<PostEntity[]> {
    try {
      const posts: PostEntity[] = await this.postModel
        .find({
          post_created_at: { $gte: startDate, $lte: endDate },
        })
        .exec();

      return posts;
    } catch (error) {
      throw new NotFoundException('Não foi possível obter os posts ordenados. Tente novamente mais tarde.');
    }
  }

  async getPostsSorted(startDate: Date, endDate: Date, order: string): Promise<PostEntity[]> {
    try {
      const sortCriteria = order === 'ups' ? 'ups' : 'num_comments';

      const posts: PostEntity[] = await this.postModel
        .find({
          post_created_at: { $gte: startDate, $lte: endDate },
        })
        .sort({ [sortCriteria]: -1 })
        .exec();

      return posts;
    } catch (error) {
      throw new NotFoundException('Não foi possível obter os posts ordenados. Tente novamente mais tarde.');
    }
  }
}
