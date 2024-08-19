'use server'

import { z } from 'zod';
import { cookies } from 'next/headers'
import { TUserResponseData, TSignUp, TSignIn } from '../types';
import { signUp, signIn } from '../services/auth';

async function sleep(ms=1000) {
  return new Promise((res) => setTimeout(res, ms));
}

const signInSchema = z.object({
  username: z.string().min(3).max(16),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)\w{6,}$/, { message: 'Should inclue A-Za-z\\d, min length 6' })
});

export async function actionSignUp(prevState:TUserResponseData, data: FormData): Promise<TUserResponseData> {
  await sleep();
  
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
    const jwtToken = await signUp(signUnData as TSignUp);
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

export async function actionSignIn(prevState:TUserResponseData, data: FormData): Promise<TUserResponseData> {
  await sleep();
  
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
    const jwtToken = await signIn(signUnData as TSignIn);
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

export async function actionLogOut(data: FormData) {
  cookies().set('jwttoken', '', { maxAge: 0 })
}