import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields, baseUserFields } from "../base";
import work from "./work";

const workRequirement = pgTable('work_requirement', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id),
  required: integer().notNull().default(0),
  startDate: date(),
  endDate: date(),
  notes: varchar({ length: 256 }),
  ...baseTimeFields,
  ...baseUserFields
});

export const workRequirementRelations = relations(workRequirement, ({ one, many }) => ({
  work: many(work),
	member: one(members, {
		fields: [workRequirement.member],
		references: [members.id],
	}),
}));

export default workRequirement;