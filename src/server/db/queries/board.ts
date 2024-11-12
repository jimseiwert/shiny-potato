import "server-only";
import { db } from "../";
import { Role } from "../interfaces/role";
import { persons, roleAssignments } from "../schemas";
import { eq } from "drizzle-orm";

export async function getRoles(): Promise<Role[]> {
    const query = await db.query.roles.findMany();
    const results = query.map((row) => {

        return {
            id: row.id,
            name: row.name
        }
    })

    return results
}


export async function getRoleAssignments(roleId: number): Promise<any[]> {
    const query = await db.query.roleAssignments.findMany({
        columns: {
            id: true,
            endYear: true,
        },
        with: {
            member: {
                columns: {
                    id: true, 
                    picture: true 
                },
                with: {
                    persons: {
                        columns: {
                            firstName: true,
                            lastName: true
                        },
                        where: eq(persons.type, 1)
                    }
                }
            }
        },
        where: eq(roleAssignments.role, roleId)
    });

    const results = query.map((row) => {

        return {
            id: row.id,
            memberId: row.member.id,
            picture: row.member.picture,
            name: `${row.member.persons[0].firstName} ${row.member.persons[0].lastName}`,   
            endYear: row.endYear         
        }
    })
    console.log(results)
    return results
}

export async function addAssignment(role: number, member: number): Promise<void> {
    await db.insert(roleAssignments).values({
        role: role,
        member: member,
        endYear: new Date().getFullYear() + 1
    });
    return
}

export async function changeAssignment(assignment: number, endYear: number): Promise<void> {
    console.log(assignment, endYear)
    await db.update(roleAssignments)
    .set({endYear: endYear})
    .where(eq(roleAssignments.id, assignment));
    return
}

export async function deleteAssignment(assignment: number): Promise<void> {
    await db.delete(roleAssignments).where(eq(roleAssignments.id, assignment));
        
    return
}