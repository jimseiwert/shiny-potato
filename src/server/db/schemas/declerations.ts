import {
  boolean,
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

import { baseTimeFields } from "../base";
import members from "./member";
import { relations } from "drizzle-orm";

const declerations = pgTable('declerations', {
	id: serial('id').primaryKey(),
  member: integer().references(() => members.id),
	isArcheryRO: boolean().notNull().default(false),
  isPistolRO: boolean().notNull().default(false),
  isVeteran: boolean().notNull().default(false),
  ...baseTimeFields
});

export const declerationsRelations = relations(declerations, ({ one }) => ({
	member: one(members, {
		fields: [declerations.member],
		references: [members.id],
	}),
}));


export default declerations;
