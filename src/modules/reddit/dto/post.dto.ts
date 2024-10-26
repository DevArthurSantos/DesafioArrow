import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsNumber()
  ups?: number;

  @IsNumber()
  num_comments?: number;

  @IsDate()
  post_created_at: Date;
}
