import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { letterTemplates } from '@/server/db/schemas';

export const insertLetterTemplateSchema = createInsertSchema(letterTemplates, {
    name: (schema)=> schema.name.min(1, "Name is Required").max(255, "Name is too long"),
});

export const selectLetterTemplateSchema = createSelectSchema(letterTemplates);

export type selectLetterTemplateSchemaType = typeof selectLetterTemplateSchema._type;
export type insertLetterTemplateSchemaType = typeof insertLetterTemplateSchema._type;