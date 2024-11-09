import {
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";


import statementConfig from "./statement-config";
import statements from "./statement";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const statementLines = pgTable('statement_lines', {
  id: serial().primaryKey(),
  statement: integer().references(() => statements.id, { onDelete: 'cascade' }).notNull(),
  item: integer().references(() => statementConfig.id),
  qty: decimal().notNull(),
  unitCost: decimal().notNull(),
  notes: varchar({ length: 256 }),
  ...baseTimeFields
});

export const statementLinesRelations = relations(statementLines, ({ one }) => ({
	statement: one(statements, {
		fields: [statementLines.statement],
		references: [statements.id],
	}),
  item: one(statementConfig, {
		fields: [statementLines.item],
		references: [statementConfig.id],
	}),
}));

export default statementLines;