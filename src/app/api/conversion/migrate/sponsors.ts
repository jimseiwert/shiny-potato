import { db } from "../../../../server/db";
import { eq } from "drizzle-orm";
import { members } from "../../../../server/db/schemas";
import { printProgress } from "./utils";
import { string } from "zod";


export async function Sponsors(data: any[]) {

    const recordsWithSponsor = data.filter((member) => member.sponsor && member.sponsor != "null" && member.sponsor != null && member.sponsor != undefined)

    const memberRecordLength = recordsWithSponsor.length
    let processed = 0;


    for (const doc in recordsWithSponsor) {
        const member = recordsWithSponsor[doc]
        let sponsor: string = member.sponsor;


        const memberRecord = await db.query.members.findFirst({
            where: eq(members.legacyId, member._id)
        });
        const sponsorRecord = await db.query.members.findFirst({
            where: eq(members.legacyId, sponsor)
        });

        if (!memberRecord || !sponsorRecord) {
            //console.log(`Member Record: ${member._id} , ${member.memberInfo.firstName} ${member.memberInfo.lastName}`, memberRecord)
            //console.log('Sponsor Record ' + member.sponsor, sponsorRecord)
            console.log(`Member or Sponsor not found for application ${member._id}`);

        } else {
            await db.update(members).set({ sponsor: sponsorRecord.id }).where(eq(members.id, memberRecord.id))
        }




        processed++;
        printProgress(`Processed: ${processed} of ${memberRecordLength}`)
    }
}