import types from "./data/statement-types.json";
import { statementTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(statementTypes).values(types);
}