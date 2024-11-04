// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";

const memberTypes = pgTable('member_types', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull().unique(),
});

export const typeRelations = relations(memberTypes, ({many}) => ({
  members: many(members),
}));

export default memberTypes