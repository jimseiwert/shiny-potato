import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { address, applications, members, persons } from "@/server/db/schemas";
import { error } from "console";


export async function Application(data: any[]) {
    await db.execute('TRUNCATE TABLE applications RESTART IDENTITY CASCADE');
    for (const doc of data) {
        const sponsorRecord =  await db.query.members.findFirst({ where: eq(members.legacyId, doc.sponsor.id + '') });

        if(!sponsorRecord){
            throw new Error(`Sponsor not found for application ${doc.id}`);
        }else{
            console.log('Sponsor Found')
        }

        let personRecord =  await db.query.persons.findFirst({ where: eq(persons.email, doc.applicant.email + '') });

        if(!personRecord){
            console.log('Creating new member record');
            const memberRecord = await db.insert(members).values({
                type: 1,
                status: 18,
                dateCreated: doc.createdAt,
                sponsor: sponsorRecord.id,
            }).returning({ id: members.id });

            console.log('Creating new address record');
            await db.insert(address).values({
                member: memberRecord[0].id,
                name: 'Home',
                line1: doc.applicant.line1||'',
                line2: doc.applicant.line2,
                city: doc.applicant.city||'',
                state: doc.applicant.state||'',
                zip: doc.applicant.zip||'',
            });
            
            console.log('Creating new person record', doc.applicant.occupation);
            personRecord = await db.insert(persons).values({
                member: memberRecord[0].id,
                firstName: doc.applicant.firstName,
                lastName: doc.applicant.lastName,
                email: doc.applicant.email,
                homePhone: doc.applicant.homePhone,
                cellPhone: doc.applicant.cellhone,
                occupation: doc.applicant.occupation,
                type: 1,
            }).returning({ id: persons.id, member: persons.member });
            personRecord = personRecord[0];
        }
        console.log(personRecord);
        console.log(sponsorRecord);
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

    }
}