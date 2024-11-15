import { DeleteTemplate, GetTemplate, UpdateTemplate } from "@/server/db/queries/templates";
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = await params
  if (id) {
    const obj = await GetTemplate(Number(id));
    return NextResponse.json(JSON.parse(obj));
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}

export async function POST(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = await params
  if (id) {
    const body = await req.json();
    await UpdateTemplate(Number(id), JSON.stringify(body));
    return NextResponse.json({updated: true});
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = await params
  if (id) {
    await DeleteTemplate(Number(id));
    return NextResponse.json({deleted: true});
  }

  return NextResponse.json({ error: 'ID is required' }, { status: 400 });
}