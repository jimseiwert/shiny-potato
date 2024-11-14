
import { db } from "..";
import { Template } from "../interfaces/templates";

export async function GetTemplates(): Promise<Template[]> {
    const query = await db.query.letterTemplates.findMany()

    
    return query.map((row) => { return {id: row.id, name: row.name, template: row.template} });
}