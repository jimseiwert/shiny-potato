import "server-only";
import { db } from "../..";
import { eq} from "drizzle-orm";
import { persons } from "../../schemas";
import { Applications } from "../../../interfaces/application";

export async function getAllApplications(): Promise<Applications[]> {
    const query = await db.query.applications.findMany({
        columns: {
            id: true,
            status: true,
        },
        with: {
            member: {
                columns: {
                    picture: true,
                },
                with: {
                    sponsor: {
                        columns: {
                            firstName: true,
                            lastName: true,
                        },
                        with: {
                            persons: {
                                columns: {
                                    firstName: true,
                                    lastName: true,
                                },
                                where: eq(persons.type, 1),
                            }
                        }
                    },
                    persons: {
                        columns: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            homePhone: true,
                            cellPhone: true,
                        },
                        where: eq(persons.type, 1),
                    }
                }
            },
        },
    });

    const results = query.map((row) => {
        return {
            id: row.id,
            status: row.status,
            picture: row.member?.picture,
            name: `${row.member?.persons[0]?.firstName} ${row.member?.persons[0]?.lastName}`,
            email: row.member?.persons[0]?.email,
            status: row.status,
            homePhone: row.member?.persons[0]?.homePhone,
            cellPhone: row.member?.persons[0]?.cellPhone,
            sponsor: `${row.member.sponsor?.persons[0]?.firstName} ${row.member?.sponsor?.persons[0]?.lastName}`,
        }
    })
    return results
}

