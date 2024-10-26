import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserTypeEnum } from '@app/core/enums/UserTypeEnum';
import { ObjectId } from 'mongodb';
import { type Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserEntity {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  CPF: string;

  @Prop({ type: String, required: true })
  TEL: string;

  @Prop({ type: Boolean, default: false })
  isGoogle: boolean;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: UserTypeEnum, default: UserTypeEnum.User })
  user_type: UserTypeEnum;

  @Prop({ type: Boolean, default: false })
  active: boolean;

  @Prop({ type: String })
  active_code: string;

  @Prop({ type: Date, default: null })
  created_at: Date | null;

  @Prop({ type: Date, default: null })
  updated_at: Date | null;

  @Prop({ type: Date, default: null })
  deleted_at: Date | null;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre<UserDocument>('save', function (next) {
  if (!this.CPF) {
    this.CPF = '000.000.000-00';
  }
  if (!this.TEL) {
    this.TEL = '(00) 00000-0000';
  }
  if (this.isGoogle === undefined) {
    this.isGoogle = false;
  }
  if (!this.user_type) {
    this.user_type = UserTypeEnum.User;
  }
  if (this.active === undefined) {
    this.active = false;
  }
  next();
});
