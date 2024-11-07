import "server-only";
import { db } from "../../db";
import member from "../../db/schemas/member";
import { and, asc, eq, ilike, like, or } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, personTypes } from "../../db/schemas";

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

export async function getAllMembers(props: MemberSearch) {
    const query = db.select().from(members)
    .innerJoin(persons, eq(members.id, persons.member))
    .innerJoin(personTypes, eq(personTypes.id, persons.type))
    .innerJoin(memberStatus, eq(members.status, memberStatus.id))
    .innerJoin(memberTypes, eq(members.type, memberTypes.id))
    .orderBy(members.lastName, members.firstName);

    
    const dynamicQuery = query.$dynamic();

    const queryWheres = [];
    console.log("outside props",props)
    if(props.name) {
        console.log("in props",props.name)
        queryWheres.push(ilike(persons.lastName, `%${props.name}%`));
    }

    if(props.email) {
        queryWheres.push(ilike(persons.email, `%${props.email}%`));
    }

    if(props.phone) {
        queryWheres.push(or(like(persons.homePhone, `%${props.phone}%`), like(persons.cellPhone, `%${props.phone}%`)));
    }

    if(props.memberType !== 'all') {
        queryWheres.push(eq(member.type, props.memberType));
    }

    if(props.status !== 'all') {
        queryWheres.push(eq(member.status, props.status));
    }

    if(props.personType !== 'all') {
        queryWheres.push(eq(persons.type, props.personType));
    }

    if(queryWheres.length > 0) {
        dynamicQuery.where(and(...queryWheres));
    }

    
    const results =  (await withPagination(dynamicQuery, asc(members.id), props.page, props.perPage)).map((row) => {
        console.log(row)
        return {
            id: row.persons.id,
            memberId: row.members.id,
            status: row.member_status,
            type: row.member_types,
            personType: row.person_types,
            picture: row.members.picture,
            firstName: row.persons.firstName,
            lastName: row.persons.lastName,
            email: row.persons.email,
        }
    })
console.log(results)
    return results
}

function withPagination<T extends PgSelect>(
    qb: T,
    orderByColumn: PgColumn | SQL | SQL.Aliased,
    page = 1,
    pageSize = 10,
  ) {
    return qb
      .orderBy(orderByColumn)
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }