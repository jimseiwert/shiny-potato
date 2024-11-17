import { AddNewBase, GetBase } from '@/server/db/queries/templates';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
    const body = await req.json();

    let filename = body.name.replace('.pdf', '').replace('.json', '');
    filename = filename.charAt(0).toUpperCase() + String(filename).slice(1)
    
    const result = await AddNewBase(filename, body.type, body.template);
    return NextResponse.json({id: result, name: filename});
}


export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const base = await GetBase(Number(id));
  return NextResponse.json({base: base});
}
