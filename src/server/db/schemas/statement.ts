import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import members from "./member";
import statementTypes from "./statement-types";
import { relations } from "drizzle-orm";
import { baseFields } from "../base";
import statementLines from "./statement-lines";
import payments from "./payments";

const statements = pgTable('statement', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  year: integer().default(0).notNull(),
  type: integer().references(() => statementTypes.id),
  ...baseFields
});

export const statementRelations = relations(statements, ({ one, many }) => ({
  lines: many(statementLines),
	member: one(members, {
		fields: [statements.member],
		references: [members.id],
	}),
  type: one(statementTypes, {
		fields: [statements.type],
		references: [statementTypes.id],
	}),
  payments: many(payments),
}));

export default statements;