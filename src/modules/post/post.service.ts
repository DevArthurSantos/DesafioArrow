import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { type PostDocument, PostEntity } from '../reddit/schema/post.schema';
import { Model } from 'mongoose';
import { PostsOrderProps } from '@app/core/types/PostsOrderProps';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(PostEntity.name)
    private readonly postModel: Model<PostDocument>
  ) {}

  private validatePageAndLimit(page: number, limit: number) {
    return {
      page: page > 0 ? page : 1,
      limit: limit > 0 ? limit : 10,
    };
  }

  private validateDates(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('As datas fornecidas não são válidas.');
    }

    if (start > end) {
      throw new BadRequestException('A data de início não pode ser posterior à data de término.');
    }

    return { start, end };
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;

    try {
      return this.postModel.find()
        .skip(skip)
        .limit(validatedLimit)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao tentar obter os posts. Tente novamente mais tarde.');
    }
  }

  async getPostsByDate(
    page: number = 1,
    limit: number = 10,
    startDate: string,
    endDate: string
  ): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;

    const { start, end } = this.validateDates(startDate, endDate);

    try {
      const posts = await this.postModel.find({
        post_created_at: { $gte: start, $lte: end },
      })
      .skip(skip)
      .limit(validatedLimit)
      .exec();

      if (posts.length === 0) {
        throw new NotFoundException('Nenhum post encontrado para as datas especificadas.');
      }

      return posts;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao tentar obter os posts por data. Tente novamente mais tarde.');
    }
  }

  async getPostsSorted(
    page: number = 1,
    limit: number = 10,
    startDate: string,
    endDate: string,
    order: PostsOrderProps
  ): Promise<PostEntity[]> {
    const { page: validatedPage, limit: validatedLimit } = this.validatePageAndLimit(page, limit);
    const skip = (validatedPage - 1) * validatedLimit;

    const validOrders: PostsOrderProps[] = ['ups', 'num_comments'];
    if (!validOrders.includes(order)) {
      throw new BadRequestException('Critério de ordenação inválido. Use "ups" ou "num_comments".');
    }

    const { start, end } = this.validateDates(startDate, endDate);

    try {
      const posts = await this.postModel.find({
        post_created_at: { $gte: start, $lte: end },
      })
      .sort({ [order]: -1 })
      .skip(skip)
      .limit(validatedLimit)
      .exec();

      if (posts.length === 0) {
        throw new NotFoundException('Nenhum post encontrado para as datas especificadas.');
      }

      return posts;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao tentar obter os posts ordenados. Tente novamente mais tarde.');
    }
  }
}
