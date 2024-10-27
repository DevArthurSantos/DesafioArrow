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

  private validatePageAndLimit(page: number, limit: number) {
    return {
      page: page === 0 ? 1 : page,
      limit: limit === 0 ? 10 : limit 
    };
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;

    return this.postModel.find()
      .skip(skip)
      .limit(validatedLimit)
      .exec();
  }

  async getPostsByDate(
    page: number = 1,
    limit: number = 10,
    startDate: Date,
    endDate: Date
  ): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;

    try {
      return this.postModel.find({
        post_created_at: { $gte: startDate, $lte: endDate },
      })
      .skip(skip)
      .limit(validatedLimit)
      .exec();
    } catch (error) {
      throw new NotFoundException('Não foi possível obter os posts ordenados. Tente novamente mais tarde.');
    }
  }

  async getPostsSorted(
    page: number = 1,
    limit: number = 10,
    startDate: Date,
    endDate: Date,
    order: string
  ): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;
    const sortCriteria = order === 'ups' ? 'ups' : 'num_comments';

    try {
      return this.postModel.find({
        post_created_at: { $gte: startDate, $lte: endDate },
      })
      .sort({ [sortCriteria]: -1 })
      .skip(skip)
      .limit(validatedLimit)
      .exec();
    } catch (error) {
      throw new NotFoundException('Não foi possível obter os posts ordenados. Tente novamente mais tarde.');
    }
  }
}
