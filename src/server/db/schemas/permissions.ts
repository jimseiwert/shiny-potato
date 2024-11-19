import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

const permissions = pgTable('permissions', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).unique().notNull(),
  claimName: varchar({ length: 50 }).unique().notNull(),
  group: varchar({ length: 50 }).notNull(),
});

export default permissions;