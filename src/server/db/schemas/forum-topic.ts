import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import forumMessages from "./forum-messages";
import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";

const forumTopics = pgTable('forum_topic', {
  id: serial().primaryKey(),
  name: varchar({length: 255}).notNull().unique(),
  ...baseTimeFields
});

export const forumTopicRelations = relations(forumTopics, ({many}) => ({
  messages: many(forumMessages),
}));

export default forumTopics;