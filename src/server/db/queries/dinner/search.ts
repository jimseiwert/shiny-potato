import "server-only";
import { db } from "../..";
import { dinners, dinnersReservation } from "../../schemas";
import { desc, sql, eq } from "drizzle-orm";
import { Dinner } from "../../../interfaces/dinner";

export async function getAllDinners(): Promise<Dinner[]> {
    const query = await  db
  .select({
    id: dinners.id,
    name: dinners.name,
    date: dinners.date,
    openReservations: dinners.openReservations,
    closeReservations: dinners.closeReservations,
    totalReservations: sql<number>`sum(${dinnersReservation.ticketGuests} + ${dinnersReservation.ticketMembers})`,
  })
  .from(dinners)
  .leftJoin(dinnersReservation, eq(dinners.id, dinnersReservation.dinner))
  .groupBy(dinners.id)
  .orderBy(desc(dinners.date));

    const results = query.map((row) => {

        return {
            id: row.id,
            name: row.name,
            date: new Date(row.date),
            openReservations: new Date(row.openReservations),
            closeReservations: new Date(row.closeReservations),
            status: dinnerStatus(row),
            reservations: row.totalReservations
        }
    })
    return results
}

function dinnerStatus(dinner: Dinner) {
    const now = new Date();
    const dinnerDate = new Date(dinner.date);
    const openDate = new Date(dinner.openReservations);
    const closeDate = new Date(dinner.closeReservations);

    if (now > dinnerDate) {
        return 'Closed';
    }
    if (now > openDate && closeDate > now) {
        return 'Open';
    }

    return 'Pending';
}