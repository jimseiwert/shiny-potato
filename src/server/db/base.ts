import {
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import members from "./schemas/member";




export const createdAt = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
} as const

export const updatedAt = {
  updatedAt: timestamp("updated_at"),
} as const

export const deletedAt = {
  deletedAt: timestamp("deleted_at"),
} as const

export const deleted = {
  deleted: boolean('deleted').default(false).notNull(),
} as const

export const createdBy = {
  createdBy: integer().references(() => members.id),
} as const

export const updatedBy = {
  updatedBy: integer().references(() => members.id),
} as const

export const deletedBy = {
  deletedBy: integer().references(() => members.id),
} as const


export const baseTimeFields = {
  ...createdAt,
  ...updatedAt,
  ...deletedAt,
} as const

export const baseUserFields = {
  ...createdBy,
  ...updatedBy,
  ...deletedBy,
} as const

export const baseFields = {
  ...baseTimeFields,
  ...baseUserFields,
  ...deleted,
} as const