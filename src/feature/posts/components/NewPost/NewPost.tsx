'use client'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { TextField, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { EPostFormFields } from "../../types";
import { createNew } from '../../queries';
import { useRef } from 'react';

type TFormData = {
  [EPostFormFields.TITLE]: string;
  [EPostFormFields.CONTENT]: string;
  [EPostFormFields.CSRF_TOKEN]: string;
}

type TProps = {
  csrfToken?: string;
}
export default function NewPost({
  csrfToken=''
}: TProps) {
  const refForm = useRef<HTMLFormElement>(null);
  const route = useRouter();
  const { handleSubmit, register } = useForm<TFormData>({
    defaultValues: {
      [EPostFormFields.TITLE]: '',
      [EPostFormFields.CONTENT]: '',
      [EPostFormFields.CSRF_TOKEN]: csrfToken,
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createNew,
    onSuccess: () => route.refresh(),
  });

  const submit: SubmitHandler<TFormData> = (data: TFormData) => {
    const fd = new FormData(refForm.current as HTMLFormElement);
    mutate(fd);
  }

  return (
    <form ref={refForm} onSubmit={handleSubmit(submit)} className="max-w-[30rem] mx-auto py-4 px-8 flex flex-col gap-4">
      <input type='hidden' {...register(EPostFormFields.CSRF_TOKEN)} />

      <TextField {...register(EPostFormFields.TITLE, { required: true })} label="Title" required />

      <TextField {...register(EPostFormFields.CONTENT, { required: true })} label="Title" multiline={true} minRows={5} required />

      <div className="flex gap-4">
        <Button type="reset">Reset</Button>
        <LoadingButton type="submit" loading={isPending}>Submit</LoadingButton>
      </div>
    </form>
  );
}