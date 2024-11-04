import {
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const memos = pgTable('memos', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  createdBy: integer().references(() => members.id),
  memo: text().notNull(),
  ...baseTimeFields
});

export const memoRelations = relations(memos, ({ one }) => ({
	member: one(members, {
		fields: [memos.member],
		references: [members.id],
	}),
}));

export default memos;