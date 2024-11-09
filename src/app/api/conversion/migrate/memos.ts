import { eq } from "drizzle-orm";
import { db } from "../../../../server/db";
import { activity, members } from "@/server/db/schemas";

interface Memo {
    _id: string;
    member: number;
    message: string;
    dateAdded: Date;
    addedBy: number;
}

export async function Memos(importedMembers: any[], data: Memo[]) {
    await db.execute('TRUNCATE TABLE member_activity RESTART IDENTITY CASCADE');
    console.log(`Migrating ${data.length} memos`);
    let count = 0;
    const activityLog = [];


    const memoMembers = Array.from(new Set(data.map((m) => m.member)));

    for (const member of importedMembers) {
        const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, member._id + '') });

        if (memberRecord) {
                if (member.dateInducted) {
                    activityLog.push({ member: memberRecord.id, type: 'system', createdBy: memberRecord.id, createdAt: member.dateInducted, activity: `${member?.memberInfo.firstName} was inducted` });
                };
                if (member.dateInactive) {
                    activityLog.push({ member: memberRecord.id, type: 'system', createdBy: memberRecord.id, createdAt: member.dateInactive, activity: `${member?.memberInfo.firstName} went inactive` });
                };
                if (member.dateDropped) {
                    activityLog.push({ member: memberRecord.id, type: 'system', createdBy: memberRecord.id, createdAt: member.dateDropped, activity: `${member?.memberInfo.firstName} dropped out from the club` });
                };
                if (member.dateDeceased) {
                    activityLog.push({ member: memberRecord.id, type: 'system', createdBy: memberRecord.id, createdAt: member.dateDropped, activity: `${member?.memberInfo.firstName} was marked as deceased` });
                };
        }

        count++;
        console.log(`Memos migrated: ${count} of ${importedMembers.length}`);
    }
    count = 0;
    for (const mId of memoMembers) {
        const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, mId + '') });

        if (memberRecord) {
            
            const memosToImport = data.filter((m) => m.member === mId);
            for (const memo of memosToImport) {
                if (memo.message) {
                    const createdBy = await db.query.members.findFirst({ where: eq(members.legacyId, memo.addedBy + '') });
                    if (memberRecord && createdBy) {
                        activityLog.push({ member: memberRecord.id, type: 'comment', createdBy: createdBy.id, createdAt: memo.dateAdded, activity: memo.message });
                    }
                }
            }
        }

        count++;
        console.log(`Memos migrated: ${count} of ${memoMembers.length}`);
    }

    console.log('Inserting memos');
    await db.insert(activity).values(activityLog.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    console.log('Memos inserted');

}
