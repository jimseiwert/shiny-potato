import { put } from '@vercel/blob';
import { log } from 'console';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const data = await request.formData()

  console.log(data)

  return NextResponse.json({test: "foo"});
}

