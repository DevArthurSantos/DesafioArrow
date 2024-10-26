import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ObjectId } from 'mongodb';
import { type Document } from 'mongoose';

export type PostDocument = PostEntity & Document;

@Schema({ collection: 'posts', timestamps: true })
export class PostEntity {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: Number, default: 0 })
  ups: number;

  @Prop({ type: Number, default: 0 })
  num_comments: number;

  @Prop({ type: Date, required: true })
  post_created_at: Date;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);

PostSchema.pre<PostDocument>('save', function (next) {
  if (!this.ups) {
    this.ups = 0;
  }
  if (!this.num_comments) {
    this.num_comments = 0;
  }
  if (!this.deleted_at) {
    this.deleted_at = null;
  }
  next();
});
