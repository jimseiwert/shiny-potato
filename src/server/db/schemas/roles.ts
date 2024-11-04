import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";

const roles = pgTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).unique().notNull(),
  group: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 50 }),
  ...baseTimeFields
});

export default roles;