import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const applications = pgTable('applications', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id,  {onDelete: 'cascade'}).unique().notNull(),
  sponsor: integer().references(() => members.id, {onDelete: 'cascade'}).unique().notNull(),
  first_name: varchar({ length: 50 }).notNull(),
  ...baseTimeFields
});

export const applicationRelations = relations(applications, ({ one }) => ({
	member: one(members, {
		fields: [applications.member],
		references: [members.id],
	}),
  sponsor: one(members, {
		fields: [applications.member],
		references: [members.id],
	}),
}));

export default applications;