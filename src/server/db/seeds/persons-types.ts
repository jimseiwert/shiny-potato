import types from "./data/person-types.json";
import { personTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(personTypes).values(types);
}