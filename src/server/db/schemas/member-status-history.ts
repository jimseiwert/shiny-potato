// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import members from "./member";
import statuses from "./member-status";
import { createdAt, createdBy } from "../base";



const memberStatusHistory = pgTable('member_status_history', {
  id: serial().primaryKey(),
  status: integer().references(() => statuses.id).notNull(),
  member: integer().references(() => members.id).notNull(),
  ...createdBy,
  ...createdAt,
});

export const memberStatusHistoryRelations = relations(memberStatusHistory, ({ one }) => ({
  status: one(statuses, {
    fields: [memberStatusHistory.status],
    references: [statuses.id],
  }),
  member: one(members, {
    fields: [memberStatusHistory.member],
    references: [members.id],
  }),
}));


export default memberStatusHistory

