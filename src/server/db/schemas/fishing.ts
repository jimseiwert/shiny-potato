import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const fishing = pgTable('fishing', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  ...baseTimeFields
});

export const fishingRelations = relations(fishing, ({ one }) => ({
	member: one(members, {
		fields: [fishing.member],
		references: [members.id],
	}),
}));

export default fishing;