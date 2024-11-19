import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";

const permissions = pgTable('permissions', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).unique().notNull(),
  claimName: varchar({ length: 50 }).unique().notNull(),
});

export default permissions;