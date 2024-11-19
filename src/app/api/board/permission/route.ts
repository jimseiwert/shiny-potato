import { handleError } from "@/lib/errorHandler";
import { addPermission, deleteAssignedPermission, getPermissions } from "@/server/db/queries/permission";
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async function GetPermissions(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const results = await getPermissions(Number(searchParams.get('role')));
        return NextResponse.json(results);
    } catch (error) {
        return handleError(error);
    }
}

export const POST = async function AddPermissionToRole(request: NextRequest): Promise<NextResponse> {
    try {
        const data: { role: number, permission: number } = await request.json()
        const result = await addPermission(data.role, data.permission);
        return NextResponse.json({ id: result });
    } catch (error) {
        return handleError(error);
    }
}

export const DELETE = async function DeletePermissionFromRole(request: Request): Promise<NextResponse> {
    try {
        const data: { id: number } = await request.json()
        await deleteAssignedPermission(data.id);
        return NextResponse.json({ deleted: true });
    } catch (error) {
        return handleError(error);
    }
} 

