import { members, work, workRequirement } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
import { db } from "../../../../server/db";

export async function Work(data: any[]) {
    await db.execute('TRUNCATE TABLE work RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE work_requirement RESTART IDENTITY CASCADE');
    console.log(data[1]);
    let count = 0;
    for (const doc of data) {
        const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, doc.member + '') });

        if (memberRecord) {


            for (const y of doc.years) {
                const reqRec = await db.insert(workRequirement).values({
                    member: memberRecord.id,
                    required: (y.trapRequired || 0) + (y.groundsRequired || 0),
                    startDate: y.startDate,
                    endDate: y.endDate,
                }).returning({ id: workRequirement.id })

                const workEntries = [];
                for (const w of y.workCompleted) {
                    const addedByRecord = await db.query.members.findFirst({ where: eq(members.legacyId, w.addedBy + '') });
                    workEntries.push({
                        workRequirement: reqRec[0].id,
                        workDate: w.workDate,
                        type: w.isTrap ? 'trap' : 'grounds',
                        notes: w.notes,
                        createdBy: addedByRecord?.id || 118,
                    });
                }
                if (workEntries.length > 0) {
                    await db.insert(work).values(workEntries);
                }
            }

        }
        count++;
        console.log(`Work migrated: ${count} of ${data.length}`);
    }

}