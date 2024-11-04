import "server-only";
import { db } from "../db";

export async function getAllmemberStatus() {
    return await db.query.memberStatus.findMany();
}

