import { and, eq, or } from 'drizzle-orm';
import { db } from '../../index';
import { members, persons } from '../../schemas';
import { UniqueMember } from '../../interfaces/member';

export async function AllMembers(): Promise<UniqueMember[]> {
    const member = await db.query.members.findMany({
        columns: {
            id: true,
        },
        where: and(eq(members.type, 1), or(eq(members.status, 1), eq(members.status, 2), eq(members.status, 7))),
        with: {
            persons: {
                columns: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
                where: eq(persons.type, 1),
            }
        }
    });

    const results = member.filter((row)=> row.persons.length >0).map((row) => {
        return {
            memberId: row.id,
            personId: row.persons[0].id,
            name: `${row.persons[0].firstName} ${row.persons[0].lastName}`
        }
    });
    
    return results;
}