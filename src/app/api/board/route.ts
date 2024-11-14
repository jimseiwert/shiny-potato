import { handleError } from "@/lib/errorHandler";
import { addAssignment, changeAssignment, deleteAssignment, getRoleAssignments } from "@/server/db/queries/board";
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const results = await getRoleAssignments(Number(searchParams.get('role')))
        return NextResponse.json(results);
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const data: { role: number, member: number } = await request.json()
        await addAssignment(data.role, data.member);
        return NextResponse.json({ added: true });
    } catch (error) {
        return handleError(error);
    }
}


export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        const data: { id: number, endYear: number } = await request.json()
        await changeAssignment(data.id, data.endYear);
        return NextResponse.json({ updated: true });
    } catch (error) {
        return handleError(error);
    }
}


export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const id = Number(searchParams.get('id'));

        await deleteAssignment(id);
        return NextResponse.json({ deleted: true });
    } catch (error) {
        return handleError(error);
    }
}  