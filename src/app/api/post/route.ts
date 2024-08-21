import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { BadRequestException, exceptionHandler, getAuthUser, verifyCsrf } from '@/utils';
import { create } from '@/feature/posts/services/post.service';
import { TCreatePost } from '@/feature/posts/types';

const createSchema = z.object({
  title: z.string().min(4).max(16),
  content: z.string().min(4).max(200),
});

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    await verifyCsrf(fd);

    const createData = {
      title: fd.get('title'),
      content: fd.get('content'),
    };
    const validate = createSchema.safeParse(createData);
    if (!validate.success) throw new BadRequestException(validate.error.toString());

    const user = await getAuthUser();
    const newPost = await create({
      ...createData,
      authorId: user.id
    } as TCreatePost);

    return NextResponse.json(newPost);
  } catch (e) {
    return exceptionHandler(e as Error);
  }
}
