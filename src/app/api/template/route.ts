import { CreateTemplate, GetTemplates } from "@/server/db/queries/templates";
import { Template } from "@pdfme/common";
import { NextResponse } from 'next/server';


export async function GET(): Promise<NextResponse> {
  const letters = await GetTemplates()

  return NextResponse.json(letters);
}

export async function POST(req: Request): Promise<NextResponse> {
  const formData = await req.formData();
  const name = formData.get('name');
  if (name) {
    const template: Template = {
      schemas: [[]],
        basePdf: {
          width: 210,
          height: 297,
          padding: [5, 5, 5, 5],
          staticSchema: [],
        },
    };

    const obj = await CreateTemplate(name.toString(), JSON.stringify(template));
    return NextResponse.json(obj);
  }

  return NextResponse.json({ error: 'Name is required' }, { status: 400 });
}
