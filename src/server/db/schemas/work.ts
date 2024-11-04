import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";

import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const work = pgTable('work', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  ...baseTimeFields
});

export const workRelations = relations(work, ({ one }) => ({
	member: one(members, {
		fields: [work.member],
		references: [members.id],
	}),
}));

export default work;