import "server-only";
import { db } from "../db";
import member from "../db/schemas/member";
import { and, eq, like, or } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, personTypes } from "../db/schemas";

export interface MemberSearch {
    name?: string;
    email?: string;
    phone?: string;
    memberType?: number;
    status?: number;
    personType?: number;
}

export async function getAllMembers(props: MemberSearch) {
    const query = db.select().from(members)
    .innerJoin(persons, eq(members.id, persons.member))
    .innerJoin(personTypes, eq(personTypes.id, persons.type))
    .innerJoin(memberStatus, eq(member.status, memberStatus.id))
    .innerJoin(memberTypes, eq(member.type, memberTypes.id))
    .orderBy(persons.lastName, persons.firstName);

    
    const dynamicQuery = query.$dynamic();

    const queryWheres = [];

    if(props.name) {
        queryWheres.push(like(persons.lastName, props.name));
    }

    if(props.email) {
        queryWheres.push(like(persons.email, props.email));
    }

    if(props.phone) {
        queryWheres.push(or(like(persons.homePhone, props.phone), like(persons.cellPhone, props.phone)));
    }

    if(props.memberType) {
        queryWheres.push(eq(member.type, props.memberType));
    }

    if(props.status) {
        queryWheres.push(eq(member.status, props.status));
    }

    if(props.personType) {
        queryWheres.push(eq(persons.type, props.personType));
    }

    if(queryWheres.length > 0) {
        dynamicQuery.where(and(...queryWheres));
    }

    const results =  (await dynamicQuery).map((row) => {
        return {
            id: row.members.id,
            status: row.member_status,
            type: row.member_types,
            personType: row.person_types,
            picture: row.members.picture,
            firstName: row.person.firstName,
            lastName: row.person.lastName,
            email: row.person.email,
        }
    })

    return results
}


export async function getMember(id: number) {
    console.log(id);
    const member = await db.query.members.findFirst({
        with: {
            persons: {
                with: {
                    personType: true
                }
            },
            address: true
        },
        where: (model, { eq }) => eq(model.id, id),
    });

    if(!member) {
        return null
    }

    const memberInfo = member.persons.find((a) => a.personType.name === 'Member');
    const dependents = member.persons.filter((a) => a.personType.name != 'Member');

    const returnObj = {
        id: member.id,
        picture: member.picture,
        memberInfo: memberInfo,
        dependents: dependents,
        address: member.address
    }

    console.log(member);
    return returnObj;
}