import { eq } from "drizzle-orm";
import { db } from "../../../../server/db";
import { members, memos } from "@/server/db/schemas";

interface Memo {
    _id: string;
    member: number;
    message: string;
    dateAdded: Date;
    addedBy: number;
}

export async function Memos(data: Memo[]) {
    console.log(`Migrating ${data.length} memos`);
    let count = 0;
    const skipMemos = [];
    for (const memo of data) {

        if (!skipMemos.includes(memo._id + '')) {


            const member = await db.query.members.findFirst({ where: eq(members.legacyId, memo.member + '') });
            const createdBy = await db.query.members.findFirst({ where: eq(members.legacyId, memo.addedBy + '') });

            console.log("****************")
            console.log("Memo", memo)
            console.log("Member", member)
            console.log("Created By", createdBy)
            console.log("****************")

            if (!member) {
                skipMemos.push({ id: memo._id + '', message: memo.message });
                console.log(`Member not found for memo ${memo.member}`);
                //throw new Error(`Member not found for memo ${memo.member}`);


                if (!createdBy) {
                    skipMemos.push({ id: memo._id + '', message: memo.message });
                    console.log(`Created By not found for memo ${memo.addedBy}`);
                    //throw new Error(`createdBy not found for memo ${memo.addedBy}`);


                    await db.insert(memos).values({
                        member: member.id,
                        memo: memo.message,
                        createdAt: memo.dateAdded,
                        createdBy: createdBy.id
                    });
                }
            }
        }
        count++;
        console.log(`Memos migrated: ${count} of ${data.length}`);
    }
}