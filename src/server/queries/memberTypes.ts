import "server-only";
import { db } from "../db";

export async function getAllMemberTypes() {
    return await db.query.memberTypes.findMany();
}

