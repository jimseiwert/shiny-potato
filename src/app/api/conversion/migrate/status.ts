import { db } from "@/server/db";
import { members, memberStatusHistory } from "@/server/db/schemas";
import { MemberStatus } from "@/server/enums/status";
import { eq } from "drizzle-orm";


export async function StatusHistory(data: [any]) {
    const activityHistory = [];
    const statusHistory = [];

    for(const member of data) {
        const memberId = (await db.query.members.findFirst({
            select: {id: true},
            where: eq(members.legacyId, member._id)
            })).id;

            if(memberId === null) {
                console.log("Member not found");
                continue;
            }
        if (member.dateInducted) {
            statusHistory.push({ member: memberId, status: MemberStatus.Inducted, createdBy: memberId, createdAt: member.dateInducted});
            activityHistory.push({ member: memberId, type: 'system', createdBy: memberId, createdAt: member.dateInducted, activity: `${member?.memberInfo.firstName} was inducted` });
        };
        if (member.dateInactive) {
            statusHistory.push({ member: memberId, status: MemberStatus.Inactive, createdBy: memberId, createdAt: member.dateInactive});
            activityHistory.push({ member: memberId, type: 'system', createdBy: memberId, createdAt: member.dateInactive, activity: `${member?.memberInfo.firstName} went inactive` });
        };
        if (member.dateDropped) {
            statusHistory.push({ member: memberId, status: MemberStatus.DroppedOut, createdBy: memberId, createdAt: member.dateDropped});
            activityHistory.push({ member: memberId, type: 'system', createdBy: memberId, createdAt: member.dateDropped, activity: `${member?.memberInfo.firstName} dropped out from the club` });
        };
        if (member.dateDeceased) {
            statusHistory.push({ member: memberId, status: MemberStatus.Deceased, createdBy: memberId, createdAt: member.dateDropped});
            activityHistory.push({ member: memberId, type: 'system', createdBy: memberId, createdAt: member.dateDropped, activity: `${member?.memberInfo.firstName} was marked as deceased` });
        };
    }
    if(statusHistory.length > 0) {
        console.log("Inserting status history " + statusHistory.length);
        await db.insert(memberStatusHistory).values(statusHistory);
    }
    // if(activityHistory.length > 0) {
    //     await db.insert(activity).values(activityHistory.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    // }
}