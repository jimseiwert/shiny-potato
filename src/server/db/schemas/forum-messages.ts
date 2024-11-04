import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import forumTopics from "./forum-topic";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const forumMessages = pgTable('forum_messages', {
  id: serial().primaryKey(),
  topic: integer().references(() => forumTopics.id), 
  message: varchar({length: 255}).notNull().unique(),
  ...baseTimeFields
});

export const forumMessageRelations = relations(forumMessages, ({one}) => ({
  type: one(forumTopics, {
    fields: [forumMessages.topic],
    references: [forumTopics.id],
  }),
}));

export default forumMessages;