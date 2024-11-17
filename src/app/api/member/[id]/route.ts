import { MemberStatements } from "@/server/db/queries/statement";
import { NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const { id } = await params
    console.log(id);
    const response = await MemberStatements(Number(id));

    return NextResponse.json(response);
}