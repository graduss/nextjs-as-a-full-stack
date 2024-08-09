'use server'

import { z } from 'zod';
import { TUserResponseData } from '../type/user.type';

async function sleep(ms=1000) {
  return new Promise((res) => setTimeout(res, ms));
}

const signInSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{6,}$/, { message: 'Should inclue A-Za-z\\d, min length 6' })
});

export async function signUp(prevState:TUserResponseData, data: FormData): Promise<TUserResponseData> {
  await sleep();
  
  const signInData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const validate = signInSchema.safeParse(signInData);

  if (!validate.success) {
    return {
      success: false,
      errors: validate.error.flatten().fieldErrors,
    }
  }

  return {
    success: true,
    message: 'success'
  }
}