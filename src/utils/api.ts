import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserByToken } from "@/feature/users/services/auth.service";
import { jwtVerify } from "@/services/jwt.service";
import { BadRequestException, InternalServerErrorException, UnauthorizedException } from "./api-exceptions";

export function exceptionHandler(e: Error) {
  return NextResponse.json(
    { message: (e as Error)?.message || 'Internal Error' },
    { status: (e as InternalServerErrorException)?.status || 500 },
  )
}

export async function getAuthUser() {
  const token = cookies().get('jwttoken');
  if (!token || !token.value) throw new UnauthorizedException;

  try {
    const user = await getUserByToken(token.value);
    if ( user )return user;
    else throw new UnauthorizedException;
  } catch (exeptions) {
    throw new UnauthorizedException;
  }
}

export async function getCurrentUserIfExist() {
  try {
    return await getAuthUser();
  } catch (_) {
    return null;
  }
}

export async function verifyCsrf(fd: FormData) {
  try {
    const csrf_token = fd.get('csrf_token');
    await jwtVerify(String(csrf_token || ''));
  } catch (e) {
    throw new BadRequestException;
  }
}