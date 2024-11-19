import {
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { createdAt, createdBy } from "../base";
import members from "./member";
import forumComments from "./forum-comments";


const forumCommentsReaction = pgTable('forum_comment_reaction', {
  id: serial().primaryKey(),
  comment: integer().references(() => forumComments.id),
  member: integer().references(() => members.id),
  reaction: varchar({length: 25}).notNull(),
  ...createdBy,
  ...createdAt,
});

export const forumCommentsReactionRelations = relations(forumCommentsReaction, ({one}) => ({
  comments: one(forumComments, {
		fields: [forumCommentsReaction.comment],
		references: [forumComments.id],
	}),
  member: one(members, {
		fields: [forumCommentsReaction.member],
		references: [members.id],
	}),
}));

export default forumCommentsReaction;