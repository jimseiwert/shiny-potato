import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import members from "./member";
import statements from "./statement";

const statementTasks = pgTable('statement_tasks', {
  id: serial().primaryKey(),
  statement: integer().references(() => members.id).notNull(),
  badge: boolean().notNull().default(false),
  family_badge: boolean().notNull().default(false),
  keycard: integer().notNull().default(0),
  sticker: integer().notNull().default(0),
  delivery: varchar({length: 10}).notNull().default("mail"),
});

export const statementTasksRelations = relations(statementTasks, ({ one }) => ({
  statement: one(statements, {
		fields: [statementTasks.statement],
		references: [statements.id],
	}),
}));

export default statementTasks;