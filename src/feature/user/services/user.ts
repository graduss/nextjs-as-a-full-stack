'use server'

import db from '@utils/db';
import { TSignUp } from "../type";

export async function ctrateUser(user: TSignUp) {
  return await db.user.create({data: user});
}