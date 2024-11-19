import {
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { createdAt, createdBy } from "../base";
import forum from "./forum";
import members from "./member";


const forumComments = pgTable('forum_comment', {
  id: serial().primaryKey(),
  post: integer().references(() => forum.id),
  member: integer().references(() => members.id),
  comment: text().notNull(),
  ...createdBy,
  ...createdAt,
});

export const forumCommentsRelations = relations(forumComments, ({one}) => ({
  post: one(forum, {
		fields: [forumComments.member],
		references: [forum.id],
	}),
}));

export default forumComments;