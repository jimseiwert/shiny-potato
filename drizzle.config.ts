import { type Config } from "drizzle-kit";

import { env } from "./src/env";

export default {
  schema: "./src/server/db/schemas/index.ts",
  out: "./src/server/db/migrations",
  //schemaFilter: ['msc'],
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  verbose: true,
  strict: true,
  //tablesFilter: ["msc_*"],
} satisfies Config;
