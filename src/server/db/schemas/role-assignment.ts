import {
  integer,
  pgTable,
  serial,
  unique,
} from "drizzle-orm/pg-core";
import member from "./member";
import roles from "./roles";
import { baseTimeFields } from "../base";
import { relations } from "drizzle-orm";
import members from "./member";

const roleAssignments = pgTable('role_assignments', {
  id: serial().primaryKey(),
  role: integer().references(() => roles.id),
  member: integer().references(() => member.id),
  endYear: integer(),
  ...baseTimeFields
}, (t) => ({
  userAssignment: unique().on(t.role, t.member),
}));

export const roleAssignmentsRelations = relations(roleAssignments, ({ one }) => ({
	member: one(members, {
		fields: [roleAssignments.member],
		references: [members.id],
	}),
  role: one(roles, {
		fields: [roleAssignments.role],
		references: [roles.id],
	}),
}));

export default roleAssignments;