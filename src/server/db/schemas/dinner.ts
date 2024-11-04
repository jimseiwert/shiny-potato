// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";


const dinners = pgTable('dinners', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  ...baseTimeFields
});

export default dinners