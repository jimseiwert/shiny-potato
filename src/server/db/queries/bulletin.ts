import "server-only";
import { db } from "../";
import { bulletins } from "../schemas";
import { eq } from "drizzle-orm";
import { Bulletin } from "@/app/admin/bulletins/table/bulletin";

export async function getAllBulletins(): Promise<Bulletin[]> {
    const query = await db.query.bulletins.findMany();
    const results = query.map((row) => {

        return {
            id: row.id,
            month: row.month,
            year: row.year,
            state: row.state,
        }
    })
    return results
}

export async function insertBulletin(year: number, month: number, file: string) {
    await db.insert(bulletins).values({
        year: year,
        month: month,
        openReservations: new Date(),
        closeReservations: new Date(),
        state: 'Draft',
        file: file
    });
}


export async function editBulletin(id: number, year: number, month: number) {
    await db.update(bulletins)
        .set({month: month, year: year})
        .where(eq(bulletins.id, id));
}
   