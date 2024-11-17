
import { and, eq } from "drizzle-orm";
import { db } from "..";
import { Template } from "../../interfaces/template";
import { basePDF, letterTemplates } from "../schemas";

export async function GetTemplates(): Promise<Template[]> {
    const query = await db.query.letterTemplates.findMany(
            {
                where: eq(letterTemplates.deleted, false)
            }
    )

    
    return query.map((row) => { return {id: row.id, name: row.name} });
}

export async function GetTemplate(id: number): Promise<string> {
    const query = await db.query.letterTemplates.findFirst({
        columns: {
            template: true
        },
        where: eq(letterTemplates.id, id)
    })

    
    return query?.template || "";
}

export async function CreateTemplate(name: string, template: string): Promise<{id: number, name: string}> {
    const result = await db.insert(letterTemplates).values({name: name, template: template})
            .returning({id: letterTemplates.id, name: letterTemplates.name});

    return result[0];
}

export async function UpdateTemplate(id: number, template: string): Promise<void> {
    await db.update(letterTemplates)
    .set({template: template})
    .where(eq(letterTemplates.id, id));

    return;
}

export async function DeleteTemplate(id: number): Promise<void> {
    await db.update(letterTemplates)
    .set({deleted: true})
    .where(eq(letterTemplates.id, id));
    return;
}


export async function AddNewBase(name: string, type: string, base: string): Promise<number> {
    const result = await db.insert(basePDF).values({name: name, type: type, template: base}).returning({id: basePDF.id});
    return result[0].id
}

export async function GetAllBase(type: string): Promise<Template[]> {
    const query = await db.query.basePDF.findMany({
        where: eq(basePDF.type, type)
    })

    
    return query.map((row) => { return {id: row.id, name: row.name} });
}

export async function GetBase(id: number): Promise<string> {
    const query = await db.query.basePDF.findFirst({
        columns: {
            template: true
        },
        where: eq(basePDF.id, id)
    })

    
    return query?.template || "";
}