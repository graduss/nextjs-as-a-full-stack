import TextField from '@mui/material/TextField';
import { SubmitButton } from '@/conponents/ui';
import { signIn } from '@/actions';

export default function BasicSubmitForm() {
  return (
    <form className="py-4 px-8 flex flex-col gap-4" action={signIn}>
      <TextField name='username' label='Username' />
      <TextField name='password' type='password' label='Password' />
      <SubmitButton>Log in</SubmitButton>
    </form>
  )
}