import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";


import statementConfig from "./statement-config";
import statements from "./statement";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const statementLines = pgTable('statement_lines', {
  id: serial().primaryKey(),
  statement: integer().references(() => statements.id),
  line: integer().references(() => statementConfig.id),
  qty: integer().default(0).notNull(),
  ...baseTimeFields
});

export const statementLinesRelations = relations(statementLines, ({ one }) => ({
	statement: one(statements, {
		fields: [statementLines.statement],
		references: [statements.id],
	}),
}));

export default statementLines;