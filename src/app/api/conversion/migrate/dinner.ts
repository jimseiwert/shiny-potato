import { db } from "@/server/db";
import { dinners, dinnersReservation, members, payments } from "@/server/db/schemas";
import { eq } from "drizzle-orm";


export async function Dinner(data: any[]) {
    await db.execute('TRUNCATE TABLE dinner RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE dinner_reservations RESTART IDENTITY CASCADE');

    let count = 0;
    for (const rec of data) {
        const dinnerRec = await db.insert(dinners).values({
            name: rec.name,
            description: '',
            type: rec.dinnerType || 'general',
            costMember: rec.costMember,
            costGuest: rec.costGuest,
            guestAllowed: rec.guestAllowed,
            date: rec.dateDinner,
            openReservations: rec.dateStartReservations,
            closeReservations: rec.dateEndReservations,
            maxReservations: rec.maxReservations,
            onwer: 118
        }).returning({ id: dinners.id });

        for (const r of rec.reservations) {
            const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, r.member + '') });
            if (memberRecord) {
                const payment = await db.insert(payments).values({
                    dinner: dinnerRec[0].id,
                    method: 'credit',
                    amount: r.payment,
                    fee: r.creditCardFee,
                    confirmation: r.paymentConfirmation,
                    batch: `${rec.name} Batch`,
                }).returning({ id: payments.id });

                await db.insert(dinnersReservation).values({
                    dinner: dinnerRec[0].id,
                    member: memberRecord.id,
                    ticketMembers: r.members,
                    ticketGuests: r.guests,
                    payment: payment[0].id,
                });
            }
        }

        count++;
        console.log(`Dinner migrated: ${count} of ${data.length}`);
    }
}