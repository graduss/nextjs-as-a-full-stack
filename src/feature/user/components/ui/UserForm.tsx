'use client'
import { useFormState } from 'react-dom';
import TextField from '@mui/material/TextField';
import { SubmitButton } from '@/conponents/ui';
import { TUserResponseData, EUserFormFields } from '../../type';

type TProps = {
  initialState?: Awaited<TUserResponseData>;
  action: (state: Awaited<TUserResponseData>, data: FormData) => TUserResponseData | Promise<TUserResponseData>
}
export default function UserForm({
  initialState = {} as Awaited<TUserResponseData>,
  action
}: TProps) {
  const [state, formAction] = useFormState(action, initialState);

  console.log(state)

  return (
    <form className="max-w-[30rem] mx-auto py-4 px-8 flex flex-col gap-4" action={formAction}>
      <TextField
        name={EUserFormFields.USERNAME}
        label='Username'
        error={ 
          state.errors 
          && Boolean(state.errors[EUserFormFields.USERNAME])
          || undefined
        }
        helperText={ 
          state.errors 
          && state.errors[EUserFormFields.USERNAME]?.join("; ") 
          || undefined
        }
      />

      <TextField
        name={EUserFormFields.PASSWORD}
        label='Password'
        type='password'
        error={
          state.errors 
          && Boolean(state.errors[EUserFormFields.PASSWORD])
          || undefined
        }
        helperText={
          state.errors 
          && state.errors[EUserFormFields.PASSWORD]?.join("; ") 
          || undefined 
        }
      />

      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}