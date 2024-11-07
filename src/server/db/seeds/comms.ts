import commsData from "./data/comms.json";
import { comms } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(comms).values(commsData);
}