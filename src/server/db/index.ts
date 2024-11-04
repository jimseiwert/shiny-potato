import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";

import * as schemas from "@/server/db/schemas";

export const db = drizzle(sql, { schema: schemas, logger: false});