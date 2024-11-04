import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";
import state from "./state";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const address = pgTable('address', {
  id: serial().primaryKey(),
  member: integer()
    .notNull()
    .references(() => members.id),
  name: varchar({length: 255}).notNull(),
  line1: varchar({length: 255}).notNull(),
  line2: varchar({length: 255}),
  city: varchar({length: 255}).notNull(),
  state: integer().notNull().references(() => state.id),
  zip: varchar({length: 10}).notNull(),
  ...baseTimeFields
});

export const addressRelations = relations(address, ({ one }) => ({
	member: one(members, {
		fields: [address.member],
		references: [members.id],
	}),
}));

export default address;