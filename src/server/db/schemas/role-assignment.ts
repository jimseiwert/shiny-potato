import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import member from "./member";
import roles from "./roles";
import { baseTimeFields } from "../base";

const roleAssignments = pgTable('role_assignments', {
  id: serial().primaryKey(),
  role: integer().references(() => roles.id),
  member: integer().references(() => member.id),
  ...baseTimeFields
});

export default roleAssignments;