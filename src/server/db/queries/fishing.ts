import "server-only";
import { db } from "..";
import { fishingPass, persons } from "../schemas";
import { FishingPass } from "../interfaces/fishing";
import { eq } from "drizzle-orm";

export async function getAllPasses(): Promise<FishingPass[]> {
    const query = await db.query.fishingPass.findMany({
        where: eq(fishingPass.year, 2024),
        with: {
            member: {
                with: {
                    persons: {
                        columns: {
                            firstName: true,
                            lastName: true,
                        },
                        where: eq(persons.type, 1),
                    }
                }
            }
        }
    });
    const results = query.map((row) => {

        return {
            id: row.id,
            year: row.year,
            pass: row.pass,
            guest: row.guest,
            used: row.used,
            member: `${row.member?.persons[0]?.firstName} ${row.member?.persons[0]?.lastName}`,
            picture: row.member?.picture,
            email: row.member?.persons[0]?.email,
        }
    })

    return results
}
