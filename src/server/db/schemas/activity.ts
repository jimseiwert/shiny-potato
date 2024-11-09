import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";
import members from "./member";
import persons from "./person";
import statements from "./statement";

const activity = pgTable('activity', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  statement: integer().references(() => statements.id),
  activity: varchar({ length: 256 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  createdBy: integer().references(() => persons.id),
  ...baseTimeFields
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