import { eq } from "drizzle-orm";
import { db } from "..";
import { permissions, members, roleAssignments, permissionAssignments } from "../schemas";

export async function GetClaims(auth0Id: string): Promise<string[]> {
    const query = await db.selectDistinctOn([permissions.id], {
        claim: permissions.claimName
    })
    .from(members)
    .leftJoin(roleAssignments, eq(members.id, roleAssignments.member))
    .innerJoin(permissionAssignments, eq(roleAssignments.role, permissionAssignments.role))
    .innerJoin(permissions, eq(permissionAssignments.permission, permissions.id))
    .where(eq(members.auth0, auth0Id));

    const claims = query.map((row) => { return row.claim });
    return claims
}