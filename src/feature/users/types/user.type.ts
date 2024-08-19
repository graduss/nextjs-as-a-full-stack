import { User } from '@prisma/client'

export type TSignUp = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type TSignIn = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type TUserOut = Omit<User, 'password'>;
export type TUserPayload = Pick<User, 'id' | 'username'>;

export enum EUserFormFields {
  USERNAME='username',
  PASSWORD='password'
};

export type TResponseFormData = {
  success: boolean;
  errors?: { [key: string]: string | undefined };
  message?: string;
}

export type TUserResponseData = TResponseFormData & {
  errors?: {
    [key in EUserFormFields]?: string[] | undefined;
  };
};