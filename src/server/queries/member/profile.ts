import "server-only";
import { db } from "../../db";
import { eq } from "drizzle-orm";


export interface MemberSearch {
    name?: string;
    email?: string;
    phone?: string;
    memberType?: number;
    status?: number;
    personType?: number;
}



export async function getMember(id: number) {
    const member = await db.query.members.findFirst({
        with: {
            persons: {
                with: {
                    personType: true
                }
            },
            address: true,
            activity: {
                with: {
                    createdBy: {
                        with: {
                            persons: {
                                where: (persons, { eq }) => eq(persons.type, 1),
                            }
                        }

                    }
                }
            },
        },
        where: (model, { eq }) => eq(model.id, id),
    });

    if(!member) {
        return null
    }

    const memberInfo = member.persons.find((a) => a.personType.name === 'Member');
    const dependents = member.persons.filter((a) => a.personType.name != 'Member');

    console.log(member)
    const returnObj = {
        id: member.id,
        picture: member.picture,
        memberInfo: memberInfo,
        dependents: dependents,
        address: member.address,
        activity: member.activity.map((a) => {
            console.log(a)
            return {
                id: a.id,
                type: a.type,
                activity: a.activity,
                createdAt: a.createdAt,
                createdBy: {
                    name: `${a.createdBy.persons[0].firstName} ${a.createdBy.persons[0].lastName}`,
                    picture: a.createdBy.picture,
                }
            }
        })
    }

    return returnObj;
}