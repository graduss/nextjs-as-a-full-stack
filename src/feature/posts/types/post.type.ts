import { Post } from '@prisma/client';

export type TCreatePost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;

export enum EPostFormFields {
  TITLE='title',
  CONTENT='content',
  CSRF_TOKEN='csrf_token'
};