import "server-only";
import { db } from "..";

export async function getAllPersonTypes() {
    return await db.query.personTypes.findMany();
}

