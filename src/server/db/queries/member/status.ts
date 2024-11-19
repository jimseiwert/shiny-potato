import { MemberStatus } from "@/server/enums/status";
import { members } from "../../schemas";
import { db } from "../..";
import { eq } from "drizzle-orm";

export async function UpdateStatus(memberId: number, status: MemberStatus) {
    await db.update(members)
        .set({status: status})
        .where(eq(members.id, memberId));
}