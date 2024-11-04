import "server-only";
import { db } from "../db";
import member from "../db/schemas/member";
import { and, eq, like, or, sql } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, personTypes } from "../db/schemas";
import { status } from "../db/seeds";
import { PgSelect } from "drizzle-orm/pg-core";

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

// function withPagination<T extends PgSelect>(
// 	qb: T,
// 	page: number = 1,
// 	pageSize: number = 10,
// ) {
// 	return qb.limit(pageSize).offset((page - 1) * pageSize);
// }