import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import members from "./member";
import { relations } from "drizzle-orm";


const personTypes = pgTable('person_types', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
});

export const dependentTypeRelations = relations(personTypes, ({ many }) => ({
	members: many(members),
}));

export default personTypes;