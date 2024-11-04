import {
  pgTable,
  serial,
} from "drizzle-orm/pg-core";
import { baseTimeFields } from "../base";

const permissions = pgTable('permissions', {
  id: serial().primaryKey(),
  ...baseTimeFields
});

export default permissions;