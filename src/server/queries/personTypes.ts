import "server-only";
import { db } from "../db";

export async function getAllPersonTypes() {
    return await db.query.personTypes.findMany();
}

