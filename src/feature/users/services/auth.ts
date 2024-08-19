'use server';
import { hash, compare } from "bcrypt";
import { jwtSign } from "@/services/jwt.service";
import { TSignIn, TSignUp, TUserPayload } from "../types";
import { ctrateUser, getUserForLogIn } from "./user";

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
  const user = await getUserForLogIn(userData.username);
  if (!user) throw new Error('User not found');

  const verify = await compare(userData.password, user.password);
  if (!verify) throw new Error('Incorrect password');

  const jwtToken = await jwtSign<TUserPayload>({
    id: user.id,
    username: user.username,
  });

  return jwtToken;
}