import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import members from "./member";
import statementTypes from "./statement-types";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const statements = pgTable('statement', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  year: integer().default(0).notNull(),
  type: integer().references(() => statementTypes.id),
  ...baseTimeFields
});

export const statementRelations = relations(statements, ({ one }) => ({
	member: one(members, {
		fields: [statements.member],
		references: [members.id],
	}),
  type: one(statementTypes, {
		fields: [statements.type],
		references: [statementTypes.id],
	}),
}));

export default statements;