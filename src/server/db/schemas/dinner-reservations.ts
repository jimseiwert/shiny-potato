// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import { baseFields } from "../base";
import members from "./member";
import dinners from "./dinner";
import { relations } from "drizzle-orm";
import payments from "./payments";


const dinnersReservation = pgTable('dinner_reservations', {
  id: serial().primaryKey(),
  dinner: integer().references(() => dinners.id),
  member: integer().references(() => members.id),
  ticketMembers: integer().default(0).notNull(),
  ticketGuests: integer().default(0).notNull(),
  payment: integer().references(() => payments.id),
  ...baseFields
});

export const dinnersReservationRelations = relations(dinnersReservation, ({ one }) => ({
	member: one(members, {
		fields: [dinnersReservation.member],
		references: [members.id],
	}),
  dinner: one(dinners, {
		fields: [dinnersReservation.dinner],
		references: [dinners.id],
	}),
  payments: one(payments, {
		fields: [dinnersReservation.payment],
		references: [payments.id],
	}),
}));
export default dinnersReservation