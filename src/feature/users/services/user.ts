'use server'

import db from '@utils/db';
import { TSignUp, TUserPayload } from "../types";
import { jwtVerify } from '@/services/jwt.service';

export async function ctrateUser(user: TSignUp) {
  return await db.user.create({data: user});
}

export async function getUserByToken(token: string) {
  const { id } = await jwtVerify<TUserPayload>(token);

  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export async function getUserForLogIn(username: string) {
  return await db.user.findUnique({
    where: { username },
    select: { id: true, username: true, password: true }
  })
}