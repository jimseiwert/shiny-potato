import { eq } from 'drizzle-orm';
import { db } from '../../index';
import { persons, statements } from '../../schemas';


export async function MemberStatements(id:number, openOnly: boolean = false): Promise<any[]> {
    
    const query = await db.query.statements.findMany({
        columns: {
            id: true,
            year: true,
        },
        with: {
            type: {
                columns: {
                    id: true,
                    name: true,
                }
            },
            payments: {
                columns: {
                    id: true,
                    amount: true,
                    batch: true,
                    date: true,
                }
            },
            member: {
                columns: {
                    id: true,
                },
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
            }
        },
        where: eq(statements.member, id),
    });

    let results = query.map((row) => {
        let obj = {
            id: row.id,
            year: row.year,
            type: row.type.name,
            name: `${row.member.persons[0].firstName} ${row.member.persons[0].lastName}`,
            status: row.payments && row.payments.length >0 ? 'Paid' : 'Unpaid',
            batch: row.payments && row.payments.length >0 ? row.payments?.map((payment) => payment.batch).join(', ') : '',
        }
       
        return obj;
    });

    if (openOnly) {
        results = results.filter((row) => row.status === 'Unpaid');
    }

    return results;
}