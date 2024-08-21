'use server'

import { z } from 'zod';
import { cookies } from 'next/headers'
import { TUserResponseData, TSignUp, TSignIn } from '../types';
import { signUp, signIn } from '../services/auth.service';

const signInSchema = z.object({
  username: z.string().min(3).max(16),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{6,}$/, { message: 'Should inclue A-Za-z\\d, min length 6' })
});

async function authHendler(data: FormData, action: (userData: TSignIn | TSignUp) => Promise<string>) {
  const signUnData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const validate = signInSchema.safeParse(signUnData);

  if (!validate.success) {
    return {
      success: false,
      errors: validate.error.flatten().fieldErrors as TUserResponseData['errors'],
    }
  }

  try {
    const jwtToken = await action(signUnData as TSignUp | TSignIn);
    cookies().set('jwttoken', jwtToken, { httpOnly: true, sameSite: 'lax' });

  } catch (e) {
    return {
      success: false,
      errors: {
        root: (e as Error).message
      },
    }
  }

  return {
    success: true,
    message: 'success'
  }
}

export async function actionSignUp(prevState:TUserResponseData, data: FormData): Promise<TUserResponseData> {  
  return authHendler(data, signUp);
}

export async function actionSignIn(prevState:TUserResponseData, data: FormData): Promise<TUserResponseData> {  
  return authHendler(data, signIn);
}

export async function actionLogOut(data: FormData) {
  cookies().set('jwttoken', '', { maxAge: 0 })
}