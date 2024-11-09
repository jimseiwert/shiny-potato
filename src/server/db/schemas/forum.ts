import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { baseTimeFields, baseUserFields } from "../base";
import forumComments from "./forum-comments";
import { forumTagAssignments } from "./forum-tags";

const forum = pgTable('forum', {
  id: serial().primaryKey(),
  name: varchar({length: 255}).notNull(),
  slug: varchar({length: 200}).notNull(),
  ...baseTimeFields,
  ...baseUserFields
});

export const forumRelations = relations(forum, ({many}) => ({
  comments: many(forumComments),
  tags: many(forumTagAssignments)
}));

export default forum;