import { addAssignment, changeAssignment, deleteAssignment, getRoleAssignments } from "@/server/db/queries/board";
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const results = await getRoleAssignments(Number(searchParams.get('role')))
    return NextResponse.json(results);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    const data: { role: number, member: number } = await request.json()
    await addAssignment(data.role, data.member);
    return NextResponse.json({ added: true });
}


export async function PATCH(request: Request): Promise<NextResponse> {
    const data: { id: number, endYear: number } = await request.json()
    await changeAssignment(data.id, data.endYear);
    return NextResponse.json({ updated: true });
}


export async function DELETE(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));

    await deleteAssignment(id);
    return NextResponse.json({ deleted: true });
}  