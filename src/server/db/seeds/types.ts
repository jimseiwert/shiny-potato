import { memberTypes } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { MemberType } from "@/server/enums/memberTypes";
import { eq } from "drizzle-orm";
import { error } from "console";
import { validateEntries } from "./util";

export default async function seed(db: VercelPgDatabase) {

    const MemberTypes = [
        {id: MemberType.Full, name: "Full"},
        {id: MemberType.Shooting, name: "Shooting"},
        {id: MemberType.Employee, name: "Employee"},
        {id: MemberType.AIM, name: "AIM"},
    ]

    const alreadyInserted = await db.query.memberTypes.findMany();

    console.log('Validating Entries');
    validateEntries(MemberTypes, alreadyInserted);
    
    console.log('Inserting Entries');

    for(const memberType of MemberTypes) {
        const existing = await db.query.memberTypes.findFirst({where: eq(memberTypes.id, memberType.id)});
         if(existing) {
             continue;
         }

         await db.insert(memberTypes).values(memberType);
    }

}