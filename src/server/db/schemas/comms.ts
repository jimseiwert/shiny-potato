import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import members from "./member";


const comms = pgTable('comms', {
  id: serial().primaryKey(),
  name: varchar({length: 255}).notNull(),
});

export const commsRelations = relations(comms, ({ many }) => ({
	memberToComms: many(membersToComms),
}));


export const membersToComms = pgTable(
  'member_to_comms',
  {
    member: integer()
      .notNull()
      .references(() => members.id),
    comms: integer()
      .notNull()
      .references(() => comms.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.member, t.comms] }),
  }),
);

export const membersToCommsRelations = relations(membersToComms, ({ one }) => ({
  group: one(comms, {
    fields: [membersToComms.comms],
    references: [comms.id],
  }),
  member: one(members, {
    fields: [membersToComms.member],
    references: [members.id],
  }),
}));

export default comms;