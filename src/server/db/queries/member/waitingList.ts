import { and, eq } from 'drizzle-orm';
import { db } from '../../index';
import { members, persons } from '../../schemas';
import { Member } from '../../../interfaces/member';
import { MemberType } from '@/server/enums/memberTypes';
import { MemberStatus } from '@/server/enums/status';
import { PersonType } from '@/server/enums/personType';

export interface WaitingList {
    memberId: number;
    name: string;
    waitingListNumber: number;
    sponsor: string;
}
export async function GetWaitingList(): Promise<WaitingList[]> {
    const member: Member[] = await db.query.members.findMany({
        columns: {
            id: true,
            waitingListNumber: true,
        },
        where: and(eq(members.type, MemberType.Full), eq(members.status, MemberStatus.WaitingList)),
        with: {
            persons: {
                columns: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
                where: eq(persons.type, PersonType.Member),
            },
            sponsor : {
                columns: {},
                with: {
                    persons: {
                        columns: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        },
                        where: eq(persons.type, PersonType.Member),
                    },
                }
            }
        }
    });

    const results = member.map((row) => {
        return {
            memberId: row.id,
            name: `${row.persons[0].firstName} ${row.persons[0].lastName}`,
            waitingListNumber: row.waitingListNumber,
            sponsor: `${row.sponsor.persons[0].firstName} ${row.sponsor.persons[0].lastName}`
        }
    });

    return results;
}