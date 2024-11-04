import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

const state = pgTable('state', {
  id: serial().primaryKey(),
  name: varchar({length: 255}).notNull().unique(),
  code: varchar({length: 2}).notNull().unique(),
});


export default state;