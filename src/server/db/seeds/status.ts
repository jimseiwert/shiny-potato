import status from "./data/status.json";
import { memberStatus } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(memberStatus).values(status);
}