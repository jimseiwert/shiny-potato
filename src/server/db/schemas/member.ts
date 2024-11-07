import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import memberTypes from "./types";
import statuses from "./status";
import { relations } from "drizzle-orm";
import statements from "./statement";
import address from "./address";
import { baseTimeFields } from "../base";
import memberActivity from "./member-activity";
import comms, { membersToComms } from "./comms";
import persons from "./person";



const members = pgTable('members', {
	id: serial('id').primaryKey(),
  legacyId:varchar({ length: 255 }),
	status: integer().references(() => statuses.id, {onDelete: 'cascade'}).notNull(),
  type: integer().references(() => memberTypes.id, {onDelete: 'cascade'}).notNull(),
  sponsor: integer().references(() => members.id, {onDelete: 'cascade'}),
  picture: varchar({ length: 255 }),
  workObligation:varchar({ length: 50 }),
  waitingListNumber: integer(),
  suspendedUntil: date(),
  publish_phone: boolean().notNull().default(false),
  publish_email: boolean().notNull().default(false),
  ...baseTimeFields
});

export const memberRelations = relations(members, ({one, many}) => ({
  type: one(memberTypes, {
    fields: [members.type],
    references: [memberTypes.id],
  }),
  status: one(statuses, {
    fields: [members.status],
    references: [statuses.id],
  }),
  sponsor: one(members, {
    fields: [members.sponsor],
    references: [members.id],
  }),
  statements: many(statements),
  address: many(address),
  persons: many(persons),
  createdActivity: many(memberActivity, {relationName: 'createdBy',}),
  activity: many(memberActivity, {relationName: 'activity',}),
  comms: many(membersToComms),

}));

export default members;
