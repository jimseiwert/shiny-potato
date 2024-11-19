import {
  boolean,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

import { baseTimeFields } from "../base";
import { relations } from "drizzle-orm";
import persons from "./person";

const declerations = pgTable('declerations', {
	id: serial('id').primaryKey(),
  person: integer().references(() => persons.id),
	isArcheryRO: boolean().notNull().default(false),
  isPistolRO: boolean().notNull().default(false),
  isVeteran: boolean().notNull().default(false),
});

export const declerationsRelations = relations(declerations, ({ one }) => ({
	person: one(persons, {
		fields: [declerations.person],
		references: [persons.id],
	}),
}));


export default declerations;
