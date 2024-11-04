import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import memberTypes from "./types";
import statuses from "./status";
import { relations } from "drizzle-orm";
import statements from "./statement";
import memos from "./memo";
import address from "./address";
import { baseTimeFields } from "../base";
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
  memos: many(memos),
  address: many(address),
  persons: many(persons),
}));

export default members;
