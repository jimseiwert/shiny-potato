import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import members from "./member";
import statementTypes from "./statement-types";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";
import statementLines from "./statement-lines";
import payments from "./payments";

const statements = pgTable('statement', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  year: integer().default(0).notNull(),
  type: integer().references(() => statementTypes.id),
  ...baseTimeFields
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
  payments: one(payments, {
		fields: [statements.id],
		references: [payments.id],
	}),
}));

export default statements;