import { getAllmemberStatus } from "@/server/db/queries/memberStatus";
import { NextResponse } from "next/server";



export async function GET(): Promise<NextResponse> {
    const allStatus = await getAllmemberStatus();

    return NextResponse.json(allStatus);
}