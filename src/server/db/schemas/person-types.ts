import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";


const personTypes = pgTable('person_types', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
});

export default personTypes;