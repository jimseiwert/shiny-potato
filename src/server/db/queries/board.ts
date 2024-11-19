import "server-only";
import { db } from "../";
import { AssignedUserRole, Role } from "../../interfaces/role";
import { persons, roleAssignments, roles } from "../schemas";
import { asc, eq } from "drizzle-orm";
import { MemberType } from "@/server/enums/memberTypes";
import { PersonType } from "@/server/enums/personType";

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


export async function getRoleAssignments(roleId: number): Promise<AssignedUserRole[]> {
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
    return results
}

export async function addAssignment(role: number, member: number): Promise<void> {
    try {
        await db.insert(roleAssignments).values({
            role: role,
            member: member,
            endYear: new Date().getFullYear() + 1
        });
        return
    } catch (error) {
        const code: string = error?.code;
        // Unique constraint:
        if (code === '23505') {
            const detail: string = error?.detail;
            const matches = detail.match(/\((.*?)\)/g);
            if (matches) {
                throw new Error(`Duplicate assignment`);
            }
        }
        // Not-Null constraint
        else if (code === '23502') {
            const table: string = error?.table;
            const column: string = error?.column;
            throw new Error(`The column '${column}' in table '${table}' cannot be null.`);
        }
    }
}

export async function changeAssignment(assignment: number, endYear: number): Promise<void> {
    await db.update(roleAssignments)
        .set({ endYear: endYear })
        .where(eq(roleAssignments.id, assignment));
    return
}

export async function deleteAssignment(assignment: number): Promise<void> {
    await db.delete(roleAssignments).where(eq(roleAssignments.id, assignment));

    return
}


export async function GetBoardView(): Promise<any[]> {
    const query = await db.query.roleAssignments.findMany({
        columns: {
            endYear: true
        },
        with: {
            role: {
                columns: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            member: {
                columns: {
                    id: true,
                    picture: true
                },
                with: {
                    persons: {
                        columns: {
                            firstName: true,
                            lastName: true,
                            email: true
                        },
                        where: eq(persons.type, PersonType.Member)
                    }
                }
            }
        },
        orderBy: [asc(roleAssignments.role)],
    });

    console.log(query)

    const results = query.map((row) => {
        return {
            role: row.role.name,
            picture: row.member.picture,
            name: `${row.member.persons[0].firstName} ${row.member.persons[0].lastName}`,
            endYear: row.endYear,
            email: row.role.email || row.member.persons[0].email
        }
    })

    console.log(results)
    return results;
}