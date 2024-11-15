import "server-only";
import { db } from "..";
import { minutes } from "../schemas";
import { eq } from "drizzle-orm";
import { Minute } from "../interfaces/minute";


export async function GetAllMinutes(): Promise<Minute[]> {
    const query = await db.query.minutes.findMany();
    const results = query.map((row) => {

        return {
            id: row.id,
            month: row.month,
            year: row.year,
            executive: row.executive,
            approved: row.approved,
            name: row.name,
        }
    })

    return results
}

export async function insertMinute(year: number, month: number, name: string, file: string) {
    await db.insert(minutes).values({
        executive: false,
        approved: false,
        year: year,
        month: month,
        file: file,
        name: name
    });
}


export async function editMinute(id: number, year: number, month: number) {
    await db.update(minutes)
        .set({month: month, year: year})
        .where(eq(minutes.id, id));
}
 
export async function changeState(id: number, approved: boolean) {
    await db.update(minutes)
        .set({approved: approved})
        .where(eq(minutes.id, id));
}