import { eq } from "drizzle-orm";
import { db } from "../../../../server/db";
import { activity, members } from "@/server/db/schemas";
import { printProgress } from "./utils";

interface Memo {
    _id: string;
    member: number;
    message: string;
    dateAdded: Date;
    addedBy: number;
}

export async function Memos(data: Memo[]) {
    //await db.execute('TRUNCATE TABLE activity RESTART IDENTITY CASCADE');
    console.log(`Migrating ${data.length} memos`);
    const activityLog = [];


    const memoMembers = Array.from(new Set(data.map((m) => m.member)));

   
    let count = 0;
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
        printProgress(`Memos migrated: ${count} of ${memoMembers.length}`);
    }

    printProgress('Inserting memos');
    await db.insert(activity).values(activityLog.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()));
    printProgress('Memos inserted');

}
