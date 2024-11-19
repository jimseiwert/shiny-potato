import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, createdBy } from "../base";
import members from "./member";
import statements from "./statement";

const activity = pgTable('activity', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  statement: integer().references(() => statements.id),
  activity: varchar({ length: 256 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  ...createdAt,
  ...createdBy,
});

export const activityRelations = relations(activity, ({ one }) => ({
  member: one(members, {
		fields: [activity.member],
		references: [members.id],
     relationName: 'memberActivity'
	}),
  statement: one(statements, {
		fields: [activity.statement],
		references: [statements.id],
	}),
  createdBy: one(members, {
		fields: [activity.createdBy],
		references: [members.id]
	}),
}));

export default activity;