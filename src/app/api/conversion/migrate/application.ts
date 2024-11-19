import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { address, applications, members, persons } from "@/server/db/schemas";
import { error } from "console";
import { printProgress } from "./utils";
import { PersonType } from "@/server/enums/personType";
import { MemberType } from "@/server/enums/memberTypes";
import { MemberStatus } from "@/server/enums/status";


export async function Application(data: any[]) {
    await db.execute('TRUNCATE TABLE applications RESTART IDENTITY CASCADE');
    let count = 0;
    for (const doc of data) {
        const sponsorRecord =  await db.query.members.findFirst({ where: eq(members.legacyId, doc.sponsor.id + '') });

        if(!sponsorRecord){
            throw new Error(`Sponsor not found for application ${doc.id}`);
        }

        
        let personRecord =  await db.query.persons.findFirst({ where: eq(persons.email, doc.applicant.email + '') });

        if(!personRecord){
            const memberRecord = await db.insert(members).values({
                type: MemberType.Full,
                status: MemberStatus.ApplicationRequested,
                dateCreated: doc.createdAt,
                sponsor: sponsorRecord.id,
            }).returning({ id: members.id });

            await db.insert(address).values({
                member: memberRecord[0].id,
                name: 'Home',
                line1: doc.applicant.line1||'',
                line2: doc.applicant.line2,
                city: doc.applicant.city||'',
                state: doc.applicant.state||'',
                zip: doc.applicant.zip||'',
            });
            

            personRecord = await db.insert(persons).values({
                member: memberRecord[0].id,
                firstName: doc.applicant.firstName,
                lastName: doc.applicant.lastName,
                email: doc.applicant.email,
                homePhone: doc.applicant.homePhone,
                cellPhone: doc.applicant.cellhone,
                occupation: doc.applicant.occupation,
                type: PersonType.Member,
            }).returning({ id: persons.id, member: persons.member });
            personRecord = personRecord[0];
        }

        await db.insert(applications).values({
            member: personRecord.member,
            sponsor: sponsorRecord.id,
            status: doc.status || 'Pending',
            club_activity_trap: doc.applicant.clubActivities.trap,
            club_activity_pistol: doc.applicant.clubActivities.pictol,
            club_activity_archery: doc.applicant.clubActivities.archery,
            club_activity_camping: doc.applicant.clubActivities.camping,
            club_activity_fishing: doc.applicant.clubActivities.fishing,
            special_skills: doc.applicant.specialSkills,
            monthly_meetings_last_year: doc.applicant.monthlyMeetingsLastYear,
            monthly_meetings_total: doc.applicant.monthlyMeetingsTotal,
            club_functions: doc.applicant.clubFunctions,
            sponsor_shown: doc.applicant.sponsorShown,
            explain_why: doc.applicant.explainWhy,
            other_clubs: doc.applicant.otherClub,
            other_contributions: doc.applicant.otherClubContributions,
            agree: doc.applicant.agree,
            date_submitted: doc.applicant.agreeDate || doc.createdAt || new Date(),
            sponsor_extent_known: doc.sponsor.extent,
            sponsor_involvement: doc.sponsor.involvement,
            sponsor_candidate_activity: doc.sponsor.candidateActivity,
            createdAt: doc.createdAt,
        });

        count++;
        printProgress(`Applications migrated: ${count} of ${data.length}`);

    }
}