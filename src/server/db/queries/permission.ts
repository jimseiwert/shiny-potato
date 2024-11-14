import "server-only";
import { db } from "..";
import { permissionAssignments, permissions } from "../schemas";
import { asc, eq } from "drizzle-orm";
import { AssignedPermission, Permission } from "../interfaces/permission";

export async function getPermissions(): Promise<Permission[]> {
    const query = await db.query.permissions.findMany({
        columns: {id: true, name: true},
        orderBy: [asc(permissions.name)],
    });

    const results = query.map((row) => {

        return {
            id: row.id,
            name: row.name
        }
    })

    return results
}


export async function getAssignedPermissions(roleId: number): Promise<AssignedPermission[]> {
    const query = await db.query.permissionAssignments.findMany({
        columns: {id: true},
        with: {
            permissions: {
                columns: {
                    name: true,
                }
            }
        },
        where: eq(permissionAssignments.role, roleId)
    });

    const results = query.map((row) => {
            return {
                id: row.id,
                name: row.permissions.name
            }
    })

    return results
}

export async function addPermission(role: number, permission: number): Promise<void> {
    await db.insert(permissionAssignments).values({role: role, permission: permission});
    return;
}

export async function deleteAssignedPermission(id: number): Promise<void> {
    console.log(id);
    await db.delete(permissionAssignments).where(eq(permissionAssignments.id, id));
    return;
}