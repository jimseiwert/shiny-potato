import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { baseTimeFields, baseUserFields } from "../base";
import workRequirement from "./work-requirements";

const work = pgTable('work', {
  id: serial().primaryKey(),
  workRequirement: integer().references(() => workRequirement.id),
  notes: varchar({ length: 256 }),
  workDate: date().notNull(),
  ...baseTimeFields,
  ...baseUserFields
});

export const workRelations = relations(work, ({ one }) => ({
	workRequirement: one(workRequirement, {
		fields: [work.workRequirement],
		references: [workRequirement.id],
	}),
}));

export default work;