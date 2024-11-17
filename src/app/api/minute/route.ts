import { NextResponse } from 'next/server';

import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { uuid } from 'uuidv4';
import { editMinute, insertMinute } from '@/server/db/queries/minute';
import { AzureBlob } from '@/lib/azure-blob';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = `2024/${searchParams.get('filename')}`;

  const azureBlob = new AzureBlob('minute');
  const blob = await azureBlob.downloadBlob(filename);

  return NextResponse.json(blob);
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const passedFilename = searchParams.get('filename');

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const filename = `${uuid()}.pdf`;
  
  const azureBlob = new AzureBlob('minute');
  await azureBlob.uploadBlob(filename, request.body);

  await insertMinute(year, month, passedFilename, filename);
  return NextResponse.json({uploaded: true});
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const data: {id: number, month: number, year: number} = await request.json()
  await editMinute(data.id, data.year, data.month);
  return NextResponse.json({updated: true});
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  
  const minute = await db.query.minutes.findFirst({
    where: eq(minutes.id, id),
  })

  const azureBlob = new AzureBlob('minute');
  await azureBlob.deleteBlob(minute.file);

  await db.delete(minutes).where(eq(minutes.id, id));
  return NextResponse.json({deleted: true});
}