import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";
import { relations } from "drizzle-orm";
import roleAssignments from "./role-assignment";

const roles = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).unique().notNull(),
  group: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 50 }),
  ...baseTimeFields
});

export const roleRelations = relations(roles, ({ many }) => ({
	assignments: many(roleAssignments)
}));


export default roles;