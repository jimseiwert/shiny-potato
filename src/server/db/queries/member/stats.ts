import "server-only";
import { db } from "../..";
import { and, eq, inArray, sql } from "drizzle-orm";
import { members } from "../../schemas";
import { MemberType } from "@/server/enums/memberTypes";
import { MemberStatus } from "@/server/enums/status";

export interface MemberStats {
    name: string;
    value: string;
}

export async function GetMemberStats(): Promise<MemberStats[]> {
    const lifetimeCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(members)
    .where(and(
        eq(members.type, MemberType.Full),
        eq(members.status, MemberStatus.Lifetime)
    ))

    const newMemberCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(members)
    .where(and(
        eq(members.type, MemberType.Full),
        eq(members.status, MemberStatus.Lifetime)
    ))

    const fullMemberCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(members)
    .where(and(
        eq(members.type, MemberType.Full),
        inArray(members.status, [MemberStatus.Paid, MemberStatus.RenewalPending, MemberStatus.NotInGoodStanding])
    ))

    const waitingMemberCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(members)
    .where(and(
        eq(members.type, MemberType.Full),
        eq(members.status, MemberStatus.WaitingList)
    ))

    return [
        { name: 'New Members', value: newMemberCount[0].count  + '' },
        { name: 'Lifetime Members', value: lifetimeCount[0].count  + ''},
        { name: 'Full Members', value: fullMemberCount[0].count  + '' },
        { name: 'Waiting List', value: waitingMemberCount[0].count  + ''},
      ]
}
