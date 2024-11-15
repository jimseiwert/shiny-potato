import { changeState } from "@/server/db/queries/bulletin";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    const data: {id: number} = await request.json()
  
    await changeState(data.id, 'publishing');
    return NextResponse.json({published: true});
  }