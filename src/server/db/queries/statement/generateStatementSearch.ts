
import { aliasedTable, and, eq, inArray } from "drizzle-orm";
import { members, memberStatus, memberTypes, persons, statements } from "../../schemas";
import { db } from "../..";

export type GenerateStatementSearchType = {
    memberId: number;
    memberType: string;
    status: string;
    picture: string | null;
    member: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        homePhone: string | null;
        cellPhone: string | null;
    } | null,
    spouse: {
        id: number;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
    } | null,
}

export type GenerateStatementSearchProps = {
    year: number;
    memberType: number;
    memberStatus: number;
}
export default async function GenerateStatementSearch(data: GenerateStatementSearchProps): Promise<GenerateStatementSearchType[]> {
    try {

        const memberSQ = aliasedTable(persons, "memberSQ")
        const spouseSQ = aliasedTable(persons, "spouseSQ")

        const query = await db.select({
            memberId: members.id,
            memberType: memberTypes.name,
            picture: members.picture,
            status: memberStatus.name,
            member: {
                id: memberSQ.id,
                firstName: memberSQ.firstName,
                lastName: memberSQ.lastName,
                email: memberSQ.email,
                homePhone: memberSQ.homePhone,
                cellPhone: memberSQ.cellPhone,
            },
            spouse: {
                id: spouseSQ.id,
                firstName: spouseSQ.firstName,
                lastName: spouseSQ.lastName,
                email: spouseSQ.email,
            },
            statement: {
                id: statements.id,
                year: statements.year,
            }
        }).from(members)
            .innerJoin(memberStatus, eq(members.status, memberStatus.id))
            .innerJoin(memberTypes, eq(members.type, memberTypes.id))
            .fullJoin(memberSQ, and(eq(members.id, memberSQ.member), eq(memberSQ.type, 1)))
            .fullJoin(spouseSQ, and(eq(members.id, spouseSQ.member), eq(memberSQ.type, 2)))
            .fullJoin(statements, and(eq(members.id, statements.member), eq(statements.year, data.year)))
            .where(and(
                eq(members.type, Number(data.memberType)),
                eq(members.status, data.memberStatus),
            ))

            const result = query.filter((row) => !row.statement)
            
        return result;
    } catch (error) {
        console.log(error)
        return [];
    }

}