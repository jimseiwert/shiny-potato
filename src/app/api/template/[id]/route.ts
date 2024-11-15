import { DeleteTemplate, GetTemplate, UpdateTemplate } from "@/server/db/queries/templates";
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  if (params.id) {
    const obj = await GetTemplate(Number(params.id));
    return NextResponse.json(JSON.parse(obj));
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}

export async function POST(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  if (params.id) {
    const body = await req.json();
    await UpdateTemplate(Number(params.id), JSON.stringify(body));
    return NextResponse.json({updated: true});
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  if (params.id) {
    await DeleteTemplate(Number(params.id));
    return NextResponse.json({deleted: true});
  }

  return NextResponse.json({ error: 'ID is required' }, { status: 400 });
}