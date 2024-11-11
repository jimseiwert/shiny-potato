import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    // const today = new Date();
    // const year = today.getFullYear();
    // const month = today.getMonth() + 1;
    // const filename = `${uuid()}.pdf`;
  
    // await uploadBlob('bulletin', filename, request.body);
  
    // await insertBulletin(year, month, filename);
    return NextResponse.json({published: true});
  }