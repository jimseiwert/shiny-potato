import { db } from "../../../../server/db";
import { eq } from "drizzle-orm";
import { members} from "../../../../server/db/schemas";

export async function Sponsors(data: any[]) {

    const memberRecordLength = data.length
    let processed = 0;
    for (const doc in data) {
        const member = data[doc]
        if (member.sponsor) {
            const memberRecord = await db.query.members.findFirst({
                where: eq(members.legacyId, member._id)
            });
            const sponsorRecord = await db.query.members.findFirst({
                where: eq(members.legacyId, member.sponsor)
            });
            
            if(!memberRecord || !sponsorRecord) {
                console.log(`Member Record: ${member._id} , ${member.memberInfo.firstName} ${member.memberInfo.lastName}`, memberRecord)
                console.log('Sponsor Record ' + member.sponsor, sponsorRecord)
            } else{
                await db.update(members).set({ sponsor: sponsorRecord.id }).where(eq(members.id, memberRecord.id))
            }
            
            
        }

        processed++;
        console.log('Processed:', processed, 'of', memberRecordLength)
    }
}