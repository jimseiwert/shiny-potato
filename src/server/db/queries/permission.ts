import "server-only";
import { db } from "..";
import { permissionAssignments, permissions } from "../schemas";
import { asc, eq } from "drizzle-orm";
import { Permission } from "../../interfaces/permission";

export async function getPermissions(roleId: number): Promise<Permission[]> {
    console.log(roleId);
    const query = await db.select({
        id: permissions.id,
        name: permissions.name,
        group: permissions.group,
        assigned: permissionAssignments.id
    }).from(permissions)
    .fullJoin(permissionAssignments, eq(permissions.id, permissionAssignments.permission))
    .orderBy(asc(permissions.group), asc(permissions.name));

    const results = query.map((row) => {

        return {
            id: row.id,
            name: row.name,
            group: row.group,
            assigned: row.assigned,
        }
    })

    return results
}



export async function addPermission(role: number, permission: number): Promise<number> {
    const result = await db.insert(permissionAssignments).values({ role: role, permission: permission }).returning({id: permissionAssignments.id});
    return result[0].id;
}

export async function deleteAssignedPermission(id: number): Promise<void> {
    console.log(id);
    await db.delete(permissionAssignments).where(eq(permissionAssignments.id, id));
    return;
}