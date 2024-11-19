
import {
  boolean,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt } from "../base";



const paymentHooks = pgTable('payment_hook', {
  id: serial().primaryKey(),
  type: varchar({ length: 50 }),
  content: text(),
  procedded: boolean().notNull().default(false),
  ...createdAt,
});



export default paymentHooks

