import {
  integer,
  pgTable,
  serial,
  unique,
} from "drizzle-orm/pg-core";
import member from "./member";
import roles from "./roles";
import { baseTimeFields, createdAt, createdBy, deleted, deletedAt, deletedBy } from "../base";
import { relations } from "drizzle-orm";
import members from "./member";
import permissions from "./permissions";

const permissionAssignments = pgTable('permission_assignments', {
  id: serial().primaryKey(),
  role: integer().references(() => roles.id),
  member: integer().references(() => member.id),
  permission: integer().references(() => permissions.id),
  ...deleted,
  ...createdBy,
  ...createdAt,
  ...deletedBy,
  ...deletedAt,
}, (t) => ({
  permissionRoleAssignment: unique().on(t.role, t.permission, t.deleted),
  permissionUserAssignment: unique().on(t.member, t.permission, t.deleted),
}));

export const permissionAssignmentsRelations = relations(permissionAssignments, ({ one }) => ({
	member: one(members, {
		fields: [permissionAssignments.member],
		references: [members.id],
	}),
  role: one(roles, {
		fields: [permissionAssignments.role],
		references: [roles.id],
	}),
  permissions: one(permissions, {
		fields: [permissionAssignments.permission],
		references: [permissions.id],
	}),
}));

export default permissionAssignments;