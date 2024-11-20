// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";
import members from "./member";



const integrations = pgTable('integrations', {
  id: serial().primaryKey(),
  member: integer().references(() => members.id).unique(),
  auth0: varchar({ length: 50 }),
  openPath: varchar({ length: 25 }),
  clicksend: varchar({ length: 25 }),
  stripe: varchar({ length: 25 }),
});

export const integrationsRelations = relations(integrations, ({ one }) => ({
	member: one(members, {
		fields: [integrations.member],
		references: [members.id],
	}),
}));


export default integrations

