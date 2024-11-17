import { z } from "zod"

export const StatementGenerateLoadSchema = z.object({
    memberTypes: z.array(z.number()).min(1),
    memberStatus: z.array(z.number()).min(1),
})

export type StatementGenerateLoadSchemaType = typeof StatementGenerateLoadSchema._type;