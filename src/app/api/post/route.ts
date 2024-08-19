import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json(
      { message: (e as Error)?.message || 'Internal Error' },
      { status: 500 },
    )
  }
}
