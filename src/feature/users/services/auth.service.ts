'use server';
import { hash, compare } from "bcrypt";
import { jwtSign, jwtVerify } from "@/services/jwt.service";
import { TSignIn, TSignUp, TUserPayload } from "../types";
import { ctrateUser, findUserUnique } from "./user.service";

export async function signUp(userData: TSignUp) {
  const user = Object.assign(
    {},
    userData,
    { password: await hash(userData.password, 10) }
  );

  const newUser = await ctrateUser(user);

  const jwtToken = await jwtSign<TUserPayload>({
    id: newUser.id,
    username: newUser.username,
  });

  return jwtToken;
}

export async function signIn(userData: TSignIn) {
  const user = await findUserUnique({ username: userData.username }, { password: true });
  if (!user) throw new Error('User not found');

  const verify = await compare(userData.password, user.password);
  if (!verify) throw new Error('Incorrect password');

  const jwtToken = await jwtSign<TUserPayload>({
    id: user.id,
    username: user.username,
  });

  return jwtToken;
}

export async function getUserByToken(token: string) {
  const { id } = await jwtVerify<TUserPayload>(token);

  return findUserUnique({ id });
}