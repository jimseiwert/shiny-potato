import { personTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { PersonType } from "@/server/enums/personType";
import { eq } from "drizzle-orm";
import { validateEntries } from "./util";

export default async function seed(db: VercelPgDatabase) {

    const PersonList = [
        {id: PersonType.Member, name: "Member"},
        {id: PersonType.Spouse, name: "Spouse"},
        {id: PersonType.Son, name: "Son"},
        {id: PersonType.Daughter, name: "Daughter"},
        {id: PersonType.Parent, name: "Parent"},
        {id: PersonType.Grandparent, name: "Grandparent"},
        {id: PersonType.Grandchild, name: "Grandchild"},
        {id: PersonType.Sibling, name: "Sibling"},
        {id: PersonType.Other, name: "Other"}
    ]

    const alreadyInserted = await db.query.personTypes.findMany();

    console.log('Validating Entries');
    validateEntries(PersonList, alreadyInserted);
    
    console.log('Inserting Entries');
    
    for (const personType of PersonList) {
        const existing = await db.query.personTypes.findFirst({ where: eq(personTypes.id, personType.id) });
        if (existing) {
            continue;
        }

        await db.insert(personTypes).values(personType);
    }

}