import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import statements from "./statement";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const statementactivity = pgTable('statement_activity', {
  id: serial().primaryKey(),
  statement: integer().references(() => statements.id),
  activity: varchar({ length: 256 }).notNull(),
  ...baseTimeFields
});

export const statementActivityRelations = relations(statementactivity, ({ one }) => ({
	statement: one(statements, {
		fields: [statementactivity.statement],
		references: [statements.id],
	}),
}));

export default statementactivity;