
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


    return query.map((row) => { return { id: row.id, name: row.name } });
}

export async function GetTemplate(id: number): Promise<{ template: string, print_color: boolean, print_duplex: boolean, print_mailing_template: boolean }> {
    const query = await db.query.letterTemplates.findFirst({
        columns: {
            template: true,
            print_color: true,
            print_duplex: true,
            print_mailing_template: true,
        },
        where: eq(letterTemplates.id, id)
    })

    if(!query){
        throw new Error("Template not found");
    }

    return { 
        template: JSON.parse(query?.template), 
        print_color: query?.print_color,
        print_duplex: query?.print_duplex, 
        print_mailing_template: query?.print_mailing_template
     };
}

export async function CreateTemplate(name: string, template: string): Promise<{ id: number, name: string }> {
    const result = await db.insert(letterTemplates).values({ name: name, template: template })
        .returning({ id: letterTemplates.id, name: letterTemplates.name });

    return result[0];
}

export async function UpdateTemplate(id: number, template: string, print_mailing_template: boolean, print_duplex: boolean, print_color: boolean): Promise<void> {
    await db.update(letterTemplates)
        .set({ template: template, print_mailing_template: print_mailing_template, print_duplex: print_duplex, print_color: print_color })
        .where(eq(letterTemplates.id, id));

    return;
}

export async function DeleteTemplate(id: number): Promise<void> {
    await db.update(letterTemplates)
        .set({ deleted: true })
        .where(eq(letterTemplates.id, id));
    return;
}


export async function AddNewBase(name: string, type: string, base: string): Promise<number> {
    const result = await db.insert(basePDF).values({ name: name, type: type, template: base }).returning({ id: basePDF.id });
    return result[0].id
}

export async function GetAllBase(type: string): Promise<Template[]> {
    const query = await db.query.basePDF.findMany({
        where: eq(basePDF.type, type)
    })


    return query.map((row) => { return { id: row.id, name: row.name } });
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