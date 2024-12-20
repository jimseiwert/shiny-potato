import { pgTable, integer, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { baseFields } from "../base";
import members from "./member";


export const bulletins = pgTable('bulletins', {
    id: serial().primaryKey(),
    state: varchar({length: 25}).default('Draft').notNull(),
    year: integer().notNull(),
    month: integer().notNull(),
    name: varchar({length: 255}).notNull(),
    file : varchar({length: 255}).notNull(),
    ...baseFields
  });


  export const minutes = pgTable('minutes', {
    id: serial().primaryKey(),
    year: integer().notNull(),
    month: integer().notNull(),
    executive: boolean().default(false).notNull(),
    approved: boolean().default(false).notNull(),
    name: varchar({length: 255}).notNull(),
    file : varchar({length: 255}).notNull(),
    ...baseFields
  });

  export const memberDocuments = pgTable('member_documents', {
    id: serial().primaryKey(),
    member: integer()
    .notNull()
    .references(() => members.id),
    sensitive: boolean().default(false).notNull(),
    name: varchar({length: 255}).notNull(),
    file : varchar({length: 255}).notNull(),
    ...baseFields
  });