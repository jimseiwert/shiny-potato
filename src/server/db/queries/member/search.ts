import "server-only";
import { db } from "../..";
import member from "../../schemas/member";
import { and, asc, eq, ilike, like, or } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, personTypes } from "../../schemas";

export interface MemberSearch {
    name?: string;
    email?: string;
    phone?: string;
    memberType?: number | string;
    status?: number | string;
    personType?: number | string;
    page?: number;
    perPage?: number;
}

export async function getAllMembers() {
    const query = await db.select().from(members)
    .innerJoin(persons, eq(members.id, persons.member))
    .innerJoin(personTypes, eq(personTypes.id, persons.type))
    .innerJoin(memberStatus, eq(members.status, memberStatus.id))
    .innerJoin(memberTypes, eq(members.type, memberTypes.id))
    .orderBy(persons.lastName, persons.firstName);

    
    
    const results =  query.map((row) => {

        return {
            id: row.persons.id,
            picture: row.members.picture,
            name: `${row.persons.firstName} ${row.persons.lastName}`,
            memberId: row.members.id,
            status: row.member_status,
            memberType: row.member_types,
            personType: row.person_types,
            email: row.persons.email,
            homePhone: row.persons.homePhone,
            cellPhone: row.persons.cellPhone,
        }
    })
    return results
}

