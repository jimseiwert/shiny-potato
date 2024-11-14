import claimsData from "./data/claims.json";
import { permissions } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(permissions).values(claimsData);
}