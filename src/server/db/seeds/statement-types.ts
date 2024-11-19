import { statementTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { eq } from "drizzle-orm";
import { StatementType } from "@/server/enums/statementTypes";
import { validateEntries } from "./util";

export default async function seed(db: VercelPgDatabase) {

    const StatementTypes = [
        {id: StatementType.Initiation, name: "Initiation"},
        {id: StatementType.Dues, name: "Dues"},
        {id: StatementType.Supplemental, name: "Supplemental"},
        {id: StatementType.SpecialAssessment, name: "Special Assessment"}
    ]

    const alreadyInserted = await db.query.statementTypes.findMany();

    console.log('Validating Entries');
    validateEntries(StatementTypes, alreadyInserted);
    
    console.log('Inserting Entries');

    for(const statementType of StatementTypes) {
        const existing = await db.query.statementTypes.findFirst({where: eq(statementTypes.id, statementType.id)});
         if(existing) {
             continue;
         }

         await db.insert(statementTypes).values(statementType);
    }

}