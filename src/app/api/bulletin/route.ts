import { NextResponse } from 'next/server';
import { deleteBlob, downloadBlob, uploadBlob } from '@/lib/azure-blob';
import { editBulletin, insertBulletin } from '@/server/db/queries/bulletin';
import { eq } from 'drizzle-orm';
import { bulletins } from '@/server/db/schemas';
import { db } from '@/server/db';
import { uuid } from 'uuidv4';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = `2024/${searchParams.get('filename')}`;

  const blob = await downloadBlob('bulletin', filename);

  return NextResponse.json(blob);
}

export async function POST(request: Request): Promise<NextResponse> {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const filename = `${uuid()}.pdf`;

  await uploadBlob('bulletin', filename, request.body);

  await insertBulletin(year, month, filename);
  return NextResponse.json({uploaded: true});
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const data: {id: number, month: number, year: number} = await request.json()
  await editBulletin(data.id, data.year, data.month);
  return NextResponse.json({updated: true});
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  
  const bulletin = await db.query.bulletins.findFirst({
    where: eq(bulletins.id, id),
  })

  await deleteBlob('bulletin', bulletin.file);

  await db.delete(bulletins).where(eq(bulletins.id, id));
  return NextResponse.json({deleted: true});
}