import type db  from "./../index";
import seedData from "./data/member.json";
import { address, declerations, memberStatus, memberTypes, persons } from "../schemas";
import { eq } from "drizzle-orm";
import members from "../schemas/member";



export default async function seed(db: db) {
    const personTypes = await db.query.personTypes.findMany();
    const SpouseTypeId = personTypes.find((x)=>x.name ==='Spouse').id
 
    await Promise.all(
        seedData.map(async (member) => {
            const foundStatus = await db.query.memberStatus.findFirst({
                where: eq(memberStatus.name, member.status),
            });

            const foundType = await db.query.memberTypes.findFirst({
                where: eq(memberTypes.name, member.memberType),
            });

            if (!foundStatus) {
                throw new Error("Status not found " + member.status);
            }
            if (!foundType) {
                throw new Error("Type not found " + member.memberType);
            }

            
            console.log(member)
            //await db.transaction(async (tx) => {
                const newRecord = await db.insert(members).values({ legacyId: member.legacyId, status: foundStatus.id, type: foundType.id }).returning({ id: members.id });

                if(member.spouseInfo){
                    await db.insert(persons).values({ member: newRecord[0].id, occupation: '', firstName: member.spouseInfo.firstName, lastName: member.spouseInfo.lastName, email: member.spouseInfo.email, type: SpouseTypeId});    
                }
                if(member.address){
                    await db.insert(address).values({ member: newRecord[0].id, name: 'Home', line1: member.address.line1, line2: member.address.line2, city: member.address.city, state: member.address.state, zip: member.address.zip });    
                }
                if(member.declerations){
                    await db.insert(declerations).values({ member: newRecord[0].id, isArcheryRO: member.declerations.isArcheryRO, isPistolRO: member.declerations.isPistolRO, isVeteran: member.declerations.isVeteran});
                };
        })
    );
}