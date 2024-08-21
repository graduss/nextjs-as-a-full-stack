'use client';
import { LoadingButton } from '@mui/lab';
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return <LoadingButton loading={pending} type='submit'>{ children }</LoadingButton>
}