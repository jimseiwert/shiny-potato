import { AddNewBase, GetBase } from '@/server/db/queries/templates';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
    const body = await req.json();
    const result = await AddNewBase(body.name, body.template);
    return NextResponse.json({updated: true, id: result});
}


export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const base = await GetBase(Number(id));
  return NextResponse.json({base: base});
}
