import {
    pgTable,
    serial,
    text,
    varchar,
  } from "drizzle-orm/pg-core";
  
  import { baseTimeFields, baseUserFields } from "../base";

  
  const letterTemplates = pgTable('letter_template', {
    id: serial().primaryKey(),
    name: varchar({length: 255}).notNull(),
    template: text().notNull(),
    ...baseTimeFields,
    ...baseUserFields
  });
  
  
  export default letterTemplates;