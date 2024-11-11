import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import members from "./member";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";


const applications = pgTable('applications', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id).unique().notNull(),
  status: varchar({ length: 100 }).notNull(),
  club_activity_trap: boolean().notNull().default(false),
  club_activity_pistol: boolean().notNull().default(false),
  club_activity_archery: boolean().notNull().default(false),
  club_activity_camping: boolean().notNull().default(false),
  club_activity_fishing: boolean().notNull().default(false),
  special_skills: varchar({ length: 1000 }),
  monthly_meetings_last_year: integer().default(0),
  monthly_meetings_total: integer().default(0),
  club_functions: varchar({ length: 1000 }),
  sponsor_shown: boolean().notNull().default(false),
  explain_why: varchar({ length: 1000 }),
  other_clubs: varchar({ length: 1000 }),
  other_contributions: varchar({ length: 1000 }),
  agree: boolean().notNull().default(false),
  date_submitted: date().notNull(),
  sponsor_extent_known: varchar({ length: 1000 }),
  sponsor_involvement: varchar({ length: 1000 }),
  sponsor_candidate_activity: varchar({ length: 1000 }),
  ...baseTimeFields
});

export const applicationRelations = relations(applications, ({ one }) => ({
	member: one(members, {
		fields: [applications.member],
		references: [members.id],
	}),
}));

export default applications;