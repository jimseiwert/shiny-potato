import {
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import members from "./schemas/member";

export const baseTimeFields = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
  deleted: boolean('deleted').default(false).notNull(),
} as const

export const baseUserFields = {
  createdBy: integer().references(() => members.id),
  updatedBy: integer().references(() => members.id),
  deletedBy: integer().references(() => members.id),
  deleted: boolean('deleted').default(false).notNull(),
} as const
