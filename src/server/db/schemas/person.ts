import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTimeFields } from "../base";
import personTypes from "./person-types";
import members from "./member";
import { relations } from "drizzle-orm";

const persons = pgTable('person', {
	id: serial('id').primaryKey(),
  member: integer().references(() => members.id),
	firstName: varchar({ length: 50 }),
  lastName: varchar({ length: 50 }),
  occupation: varchar({ length: 50 }),
  email: varchar({ length: 50 }),
  homePhone: varchar({ length: 20 }),
  cellPhone: varchar({ length: 20 }),
  type: integer().references(() => personTypes.id, {onDelete: 'cascade'}).notNull(),
  ...baseTimeFields
});

export const personRelations = relations(persons, ({ one }) => ({
	member: one(members, {
		fields: [persons.member],
		references: [members.id],
	}),
}));


export default persons;
