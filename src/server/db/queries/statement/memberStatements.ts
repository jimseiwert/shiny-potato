import { and, eq, or } from 'drizzle-orm';
import { db } from '../../index';
import { members, persons, statements } from '../../schemas';
import { UniqueMember } from '../../../interfaces/member';

export async function MemberStatements(id:number): Promise<any[]> {
    const query = await db.query.statements.findMany({
        where: eq(statements.member, id),
    });

    console.log(query);
    
    return query;
}