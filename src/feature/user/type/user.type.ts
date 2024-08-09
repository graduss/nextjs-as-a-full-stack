type TUserEntry = {
  id: string
  username: string
  password: string
  createdAt: Date
}

export type TSignUp = Omit<TUserEntry, 'id' | 'createdAt'>;
export type TSignIn = Omit<TUserEntry, 'id' | 'createdAt'>;

export enum EUserFormFields {
  USERNAME='username',
  PASSWORD='password'
};

export type TResponseFormData = {
  success: boolean;
  errors?: { [key: string]: string[] | undefined };
  message?: string;
}

export type TUserResponseData = TResponseFormData & {
  errors?: { [key in EUserFormFields]?: string[] | undefined };
};