import {
  boolean,
    pgTable,
    serial,
    text,
    varchar,
  } from "drizzle-orm/pg-core";
  
  import { baseFields } from "../base";


  
  const letterTemplates = pgTable('letter_template', {
    id: serial().primaryKey(),
    name: varchar({length: 255}).notNull(),
    template: text().notNull(),
    print_color: boolean().default(true).notNull(),
    print_duplex: boolean().default(true).notNull(),
    print_mailing_template: boolean().default(true).notNull(),
    ...baseFields,
  });
  
  
  export default letterTemplates;


  export const basePDF = pgTable('letter_template_options', {
    id: serial().primaryKey(),
    type: varchar({length: 50}).notNull(),
    name: varchar({length: 255}).notNull(),
    template: text().notNull(),
  });