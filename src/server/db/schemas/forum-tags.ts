import {
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { baseTimeFields } from "../base";
import forum from "./forum";

const forumTags = pgTable('forum_tags', {
  id: serial().primaryKey(),
  name: varchar({length: 255}).notNull().unique(),
  ...baseTimeFields
});

export const forumTagsRelations = relations(forumTags, ({many}) => ({
  posts: many(forumTagAssignments),
}));


export const forumTagAssignments = pgTable(
  'forum_tag_assignments',
  {
    tag: integer()
      .notNull()
      .references(() => forumTags.id),
      post: integer()
      .notNull()
      .references(() => forum.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.tag, t.post] }),
  }),
);

export const forumTagAssignmentsRelations = relations(forumTagAssignments, ({ one }) => ({
  tag: one(forumTags, {
    fields: [forumTagAssignments.tag],
    references: [forumTags.id],
  }),
  post: one(forum, {
    fields: [forumTagAssignments.post],
    references: [forum.id],
  }),
}));
export default forumTags;