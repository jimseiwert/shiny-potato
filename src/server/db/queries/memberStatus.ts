import "server-only";
import { db } from "..";

export async function getAllmemberStatus() {
    return await db.query.memberStatus.findMany();
}

