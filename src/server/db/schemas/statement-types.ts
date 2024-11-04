import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";


const statementTypes = pgTable('statement_types', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
});

export default statementTypes;