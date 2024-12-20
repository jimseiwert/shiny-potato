// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";



const memberStatuses = pgTable('member_status', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull().unique(),
  color: varchar({ length: 25 }),
  active: boolean().notNull().default(true),
});

export const memberStatusRelations = relations(memberStatuses, ({ many }) => ({
	members: many(members),
}));


export default memberStatuses

