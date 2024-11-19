import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";
import { relations } from "drizzle-orm";
import { baseFields } from "../base";

const address = pgTable('address', {
  id: serial().primaryKey(),
  member: integer()
    .notNull()
    .references(() => members.id),
  name: varchar({length: 255}).notNull(),
  line1: varchar({length: 255}).notNull(),
  line2: varchar({length: 255}),
  city: varchar({length: 255}).notNull(),
  state: varchar({length: 2}).notNull(),
  zip: varchar({length: 10}).notNull(),
  ...baseFields
});

export const addressRelations = relations(address, ({ one }) => ({
	member: one(members, {
		fields: [address.member],
		references: [members.id],
	})
}));

export default address;