import "server-only";
import { db } from "..";

export async function getAllMemberTypes() {
    return await db.query.memberTypes.findMany();
}

