'use client'
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { SubmitButton } from '@/conponents/ui';
import { TUserResponseData, EUserFormFields } from '../../types';

type TProps = {
  initialState?: Awaited<TUserResponseData>;
  action: (state: Awaited<TUserResponseData>, data: FormData) => TUserResponseData | Promise<TUserResponseData>
}
export default function UserForm({
  initialState = {} as Awaited<TUserResponseData>,
  action,
}: TProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(action, initialState);

  if (state.success) router.push('/');

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

      {state.errors?.root && <div className='text-red-500'>{state.errors.root}</div>}

      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}