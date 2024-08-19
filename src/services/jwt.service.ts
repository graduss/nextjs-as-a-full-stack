'use server';
import jwt, { SignOptions } from 'jsonwebtoken';

type TJwtExt = {
  iat: number;
  exp: number;
};

export async function jwtSign<T extends object>(payload: T, opt?: SignOptions) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    Object.assign({ expiresIn: '31d' }, opt || {}),
  );
}

export async function jwtVerify<T extends object>(token: string) {
  return (jwt.verify(token, process.env.JWT_SECRET as string)) as T & TJwtExt;
}