import rolesData from "./data/roles.json";
import { roles } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export default async function seed(db: VercelPgDatabase) {
    await db.insert(roles).values(rolesData);
}