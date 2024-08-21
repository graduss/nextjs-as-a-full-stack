import { db } from '@/utils';
import { TCreatePost } from "../types";

export async function create(params: TCreatePost) {
  return db.post.create({data: params});
}

export async function getForUser(authorId: string) {
  return db.post.findMany({
    where: { authorId }
  })
}