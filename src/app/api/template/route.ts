import { CreateTemplate } from "@/server/db/queries/templates";
import { BLANK_PDF, Template } from "@pdfme/common";
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  const formData = await req.formData();
  const name = formData.get('name');
  if (name) {
    const template: Template = {
      basePdf: BLANK_PDF,
      schemas: [[]],
    };

    const obj = await CreateTemplate(name.toString(), JSON.stringify(template));
    return NextResponse.json(obj);
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}
