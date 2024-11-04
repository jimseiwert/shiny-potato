import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import statements from "./statement";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const statementPayments = pgTable('statement_payments', {
  id: serial().primaryKey(),
  statement: integer().references(() => statements.id),
  method: varchar({ length: 50 }).notNull(),
  confirmation: varchar({ length: 50 }).notNull(),
  batch: varchar({ length: 50 }).notNull(),
  ...baseTimeFields
});

export const statementPaymentsRelations = relations(statementPayments, ({ one }) => ({
	statement: one(statements, {
		fields: [statementPayments.statement],
		references: [statements.id],
	}),
}));

export default statementPayments;