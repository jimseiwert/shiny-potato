import {
  boolean,
  integer,
  pgTable,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";
import payments from "./payments";


const fishingPass = pgTable('fishing_pass', {
  id: serial().primaryKey(),
  year: integer().notNull(),
  pass: serial(),
  guest: varchar({ length: 50 }),
  used: boolean().notNull().default(false),
  member: integer().references(() => members.id),
  payment: integer().references(() => payments.id),
  ...baseTimeFields
}, (t) => ({
  passNumber: unique().on(t.year, t.pass),
}));

export const fishingRelations = relations(fishingPass, ({ one }) => ({
	member: one(members, {
		fields: [fishingPass.member],
		references: [members.id],
	}),
}));

export default fishingPass;