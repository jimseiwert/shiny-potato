
import { aliasedTable, and, eq, inArray } from "drizzle-orm";
import { address, members, memberStatus, memberTypes, persons, statements } from "../../schemas";
import { db } from "../..";
import { StatementLetter } from "@/server/interfaces/letters/StatementLetter";

export type GenerateStatementSearchType = {
    memberId: number;
    memberType: string | null;
    status: string | null;
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
    exclude: boolean;
    success: boolean;
    error: boolean;
    msg: string | null;
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

            const result = query.filter((row) => !row.statement).map((row) => {return {...row, exclude: false, success: false, error: false, msg: null}})
            
        return result;
    } catch (error) {
        console.log(error)
        return [];
    }

}



export const ConstructStatementData = async (data: number[], year: number): Promise<StatementLetter[]> => {

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
        },
        address: address
    }).from(members)
        .innerJoin(memberStatus, eq(members.status, memberStatus.id))
        .innerJoin(memberTypes, eq(members.type, memberTypes.id))
        .fullJoin(address, and(eq(members.id, address.member), eq(address.name, 'Home')))
        .fullJoin(memberSQ, and(eq(members.id, memberSQ.member), eq(memberSQ.type, 1)))
        .fullJoin(spouseSQ, and(eq(members.id, spouseSQ.member), eq(memberSQ.type, 2)))
        .fullJoin(statements, and(eq(members.id, statements.member), eq(statements.year, year)))
        .where(and(
            inArray(members.id, data)
        ))

        const result = query.map((row) => {
            if(!row.member) {
                throw new Error('Member not found')
            }

            if(!row.address) {
                throw new Error('Member Address not found')
            }
        return {
            memberId: row.memberId,
            address: {...row.address,recipient: `${row.member.firstName} ${row.member.lastName}` },
            firstName: row.member?.firstName,
            lastName: row.member?.lastName,
            email: row.member?.email,
            cellPhone: row.member?.cellPhone,
            homePhone: row.member?.homePhone,
            spouseName: `${row.spouse?.firstName || ''} ${row.spouse?.lastName || ''}`,
            spouseEmail: row.spouse?.email,
            year: year,
            description: 'Dues',
            donations: [
              'Voluntary Archery Contribution',
              'Voluntary Camping Contribution',
              'Voluntary Fishing Contribution',
              'Voluntary Pistol Contribution',
              'Woman\'s Committee Donation'
            ],
            option1: {
              item: 'Dues',
              cost: '$450',
              selected: true,
            },
            option2: {
              item: '2025 Dinners (12)',
              cost: '$300',
              selected: false,
            },
            option3: {
              item: 'Paper Bulletin',
              cost: '$45',
              selected: false,
            },
            option4: {
              item: 'Guest Fishing Book',
              cost: '$100',
              selected: false,
            },
            option5: {
              item: 'Extra Key Card',
              cost: '$10 / each',
              selected: false,
            },
            option6: {
              item: 'Extra Window Sticker',
              cost: '$10 / each',
              selected: false,
            }
          };
     
           
    })
   
    return result;
}