import {
  decimal,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";


const statementConfig = pgTable('statement_config', {
  id: serial().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  cost: decimal().default('0').notNull(),
  ...baseTimeFields
});

export default statementConfig;