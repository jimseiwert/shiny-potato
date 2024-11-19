import "server-only";
import { db } from "../..";
import { and, gte, eq, inArray, sql, between } from "drizzle-orm";
import { members, memberStatusHistory } from "../../schemas";
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
    .selectDistinct({id: memberStatusHistory.member})
    .from(memberStatusHistory)
    .innerJoin(members, eq(memberStatusHistory.member, members.id))
    .where(and(
        eq(memberStatusHistory.status, MemberStatus.Inducted),
        eq(members.type, MemberType.Full),
        between(memberStatusHistory.createdAt, new Date('2024-01-01'), new Date('2025-01-01'))
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
        { name: 'New Members', value: newMemberCount.length  + '' },
        { name: 'Lifetime Members', value: lifetimeCount[0].count  + ''},
        { name: 'Full Members', value: fullMemberCount[0].count  + '' },
        { name: 'Waiting List', value: waitingMemberCount[0].count  + ''},
      ]
}
