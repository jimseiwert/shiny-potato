import { getAllMemberTypes } from "@/server/db/queries/memberTypes";
import { NextResponse } from "next/server";


export async function GET(): Promise<NextResponse> {
    const allTypes = await getAllMemberTypes();

    return NextResponse.json(allTypes);
}