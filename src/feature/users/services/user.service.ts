'use server'

import { db } from '@/utils';
import { User } from '@prisma/client'
import { TSignUp } from "../types";

const DefaultSelect = {
  id: true,
  username: true,
  createdAt: true,
  updatedAt: true
}

export async function ctrateUser(user: TSignUp) {
  return await db.user.create({data: user});
}

type UserWhereUniqueInput = {id: string, username?: string} | {id?: string, username: string};
export async function findUserUnique(where: UserWhereUniqueInput, select?: {[key in keyof User]?: boolean }) {
  return db.user.findUnique({
    where,
    select: Object.assign({}, DefaultSelect, select || {}),
  });
}