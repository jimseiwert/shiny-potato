// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  boolean,
  date,
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseFields } from "../base";

const dinners = pgTable('dinner', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
  type: varchar({ length: 50 }).notNull(),
  costMember: decimal().default('0').notNull(),
  costGuest: decimal().default('0').notNull(),
  guestAllowed: boolean().default(true).notNull(),
  date: date().notNull(),
  openReservations: date().notNull(),
  closeReservations: date().notNull(),
  maxReservations: integer().default(200).notNull(),
  ...baseFields
});

export default dinners