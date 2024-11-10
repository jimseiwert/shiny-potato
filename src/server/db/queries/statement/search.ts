import "server-only";
import { db } from "../..";
import member from "../../schemas/member";
import { and, asc, eq, ilike, like, or } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, personTypes, statements, statementTypes } from "../../schemas";
import { stat } from "fs";

export interface StatementSearch {
    name?: string;
    email?: string;
    phone?: string;
    memberType?: number | string;
    status?: number | string;
    personType?: number | string;
    page?: number;
    perPage?: number;
}

export async function getAllStatements() {
    const query = await db.query.statements.findMany({
        columns: {
            id: true,
            year: true,
        },
        with: {
            member: {
                columns: {
                    picture: true,
                },
                with: {
                    type: true,
                    status: true,
                    persons: {
                        columns: {
                            firstName: true,
                            lastName: true,
                        },
                        where: eq(persons.type, 1),
                    }
                }
            },
            type: true,
        },
        where: eq(statements.year, 2024)
    });



    const results = query.map((row) => {

        return {
            id: row.id,
            year: row.year,
            type: row.type,
            picture: row.member?.picture,
            name: `${row.member?.persons[0]?.firstName} ${row.member?.persons[0]?.lastName}`,
            status: row.member.status,
            memberType: row.member.type,
        }
    })

    console.log(results)
    return results
}

