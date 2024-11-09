import {
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import statements from "./statement";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";
import dinners from "./dinner";


const payments = pgTable('payments', {
  id: serial().primaryKey(),
  statement: integer().references(() => statements.id),
  dinner: integer().references(() => statements.id),
  method: varchar({ length: 50 }).notNull(),
  amount: decimal().notNull(),
  fee: decimal().notNull(),
  confirmation: varchar({ length: 50 }).notNull(),
  batch: varchar({ length: 50 }).notNull(),
  ...baseTimeFields
});

export const paymentsRelations = relations(payments, ({ one }) => ({
	statement: one(statements, {
		fields: [payments.statement],
		references: [statements.id],
	}),
  dinner: one(dinners, {
		fields: [payments.dinner],
		references: [dinners.id],
	}),
}));

export default payments;