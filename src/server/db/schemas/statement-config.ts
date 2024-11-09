import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";
import memberTypes from "./types";



const statementConfig = pgTable('statement_config', {
  id: serial().primaryKey(),
  item: varchar({ length: 50 }).notNull(),
  description: varchar({ length: 256 }),
  defaultQty: integer().default(1).notNull(),
  maxQty: integer().default(1).notNull(),
  canChangeQty: boolean().default(false).notNull(),
  canChangeCost: boolean().default(false).notNull(),
  canChangeName: boolean().default(false).notNull(),
  requiredInitiation: boolean().default(false).notNull(),
  requiredRenewal: boolean().default(false).notNull(),
  adminOnly: boolean().default(false).notNull(),
  prorate: varchar({ length: 50 }).notNull(),
  memberType: integer().references(() => memberTypes.id).notNull(),
  cost: decimal().default('0').notNull(),
  ...baseTimeFields
});

export default statementConfig;