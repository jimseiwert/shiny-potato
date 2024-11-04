import types from "./data/types.json";
import { memberTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(memberTypes).values(types);
}