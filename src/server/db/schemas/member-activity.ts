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

const memberActivity = pgTable('member_activity', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  activity: varchar({ length: 256 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  createdBy: integer().references(() => persons.id),
  ...baseTimeFields
});

export const memberActivityRelations = relations(memberActivity, ({ one }) => ({
  member: one(members, {
		fields: [memberActivity.member],
		references: [members.id],
    relationName: 'activity',
	}),
  createdBy: one(members, {
		fields: [memberActivity.createdBy],
		references: [members.id],
    relationName: 'createdBy',
	}),
}));

export default memberActivity;