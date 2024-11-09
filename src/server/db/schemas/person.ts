import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { baseTimeFields } from "../base";
import members from "./member";
import { relations } from "drizzle-orm";
import personTypes from "./person-types";

const persons = pgTable('persons', {
	id: serial('id').primaryKey(),
  member: integer().references(() => members.id),
	firstName: varchar({ length: 50 }),
  lastName: varchar({ length: 50 }),
  occupation: varchar({ length: 50 }),
  email: varchar({ length: 50 }),
  homePhone: varchar({ length: 20 }),
  cellPhone: varchar({ length: 20 }),
  birthdate: varchar({ length: 20 }),
  comments: varchar({ length: 255 }),
  overrideBirthdate: boolean().notNull().default(false),
  type: integer().references(() => personTypes.id).notNull(),
  ...baseTimeFields
});

export const personsRelations = relations(persons, ({ one }) => ({
	member: one(members, {
		fields: [persons.member],
		references: [members.id],
	}),
  personType: one(personTypes, {
		fields: [persons.type],
		references: [personTypes.id],
	}),
}));


export default persons;
