import { db } from "../../../../server/db";
import { eq, ne, or } from "drizzle-orm";
import { members, address, declerations, memberStatus, memberTypes, membersToComms, persons } from "../../../../server/db/schemas";

export async function Members(data: any[]) {

    const statusMapping = {
        0: 'Bulletin Only',
        1: 'Deceased',
        2: 'Dropped Out',
        3: 'Inactive',
        4: 'Lifetime',
        5: 'Paid',
        6: 'Renewal Pending',
        7: 'Term By Board',
        8: 'Waiting List',
        9: 'Widow',
        10: 'Undetermined',
        11: 'Banned',
        12: 'Non-Payment',
        13: 'Vendor',
        14: 'Guest',
        15: 'Membership Declined',
        16: 'On Hold',
        17: 'Application Submitted',
        18: 'Induct',
        19: 'Application Requested',
        20: 'Not In Good Standing'
    }

    const typeMapping = {
        'full': 'Full',
        'shooting': 'Shooting',
        'employee': 'Employee',
        'aim': 'AIM'
    }
    const personTypes = await db.query.personTypes.findMany();
    const MemberTypeId = personTypes.find((x) => x.name === 'Member').id
    const SpouseTypeId = personTypes.find((x) => x.name === 'Spouse').id
    const SonTypeId = personTypes.find((x) => x.name === 'Son').id

    const memberMapping: any = {};

    const states: string[] = [];
    for (const doc in data) {
        const member = data[doc]
        if (member.address && (member.address.state.toString().toLowerCase() === 'south carolina')) {
            member.address.state = 'SC'
        }

        if (member.address && (member.address.state.toString().toLowerCase() === 'north carolina')) {
            member.address.state = 'NC'
        }

        if (member.address && (member.address.state.toString().toLowerCase() === 'florida')) {
            member.address.state = 'FL'
        }
        if (member.address && (member.address.state.toString().toLowerCase() === 'wisconsin')) {
            member.address.state = 'WI'
        }

        if (member.address && (member.address.state.toString().toLowerCase() === 'michigan')) {
            member.address.state = 'MI'
        }
        if (member.address && (member.address.state.toString().toLowerCase() === 'us' || 
        member.address.state.toString().toLowerCase() === '60126-2236' || 
        member.address.state.toString().toLowerCase() === 'illinois' )) {
            member.address.state = 'IL'
        }

        if(states.includes(data[doc].address.state) === false) {
            states.push(member.address.state)
        }
    }

    for (const doc in data) {

        const member = data[doc]




        if (!member.address.line1 || member.address.line1 === null || member.address.line1 === '') {
            member.address.line1 = undefined
        }

        if (!member.address.city || member.address.city === null || member.address.city === '') {
            member.address.city = undefined
        }

        if (!member.address.zip || member.address.zip === null || member.address.zip === '') {
            member.address.zip = undefined
        }

       

        if (!member.address.state || member.address.state === null || member.address.state === '') {
            member.address.state = undefined
        }



        if (!member.address.line1 && !member.address.city && !member.address.zip && !member.address.state ||
            !member.address.line1 && !member.address.city && !member.address.zip && member.address.state === 'IL'
        ) {
            member.address = undefined
        }



        if (!member.memberInfo.email || member.memberInfo.email.length === 0) {
            const missingEmails = data.filter((x: any) => x.memberInfo.email.toString().startsWith('msc_noemail_')).length
            member.memberInfo.email = `msc_noemail_${missingEmails + 1}@gmail.com`
        }

        if (!member.spouseInfo.email || member.spouseInfo.email.length === 0) {
            member.spouseInfo.email = null
        }

        if (!member.spouseInfo.email && !member.spouseInfo.firstName && !member.spouseInfo.lastName) {
            member.spouseInfo = undefined
        }
    }

    const memberRecordLength = data.length
    let processed = 0;
    for (const doc in data) {
        const run = {
            name: `${data[doc].memberInfo.firstName} ${data[doc].memberInfo.lastName}`,
            memberRecord: 0,
            statusFound: false,
            typeFound: false,
            memberInfo: false,
            spouseInfo: false,
            address: false,
            declerations: false,
            error: ''
        }
        try {
            const member = data[doc]

            const oldStatus = statusMapping[member.status]
            const foundStatus = await db.query.memberStatus.findFirst({
                where: eq(memberStatus.name, oldStatus),
            });

            const oldType = typeMapping[member.memberType]
            const foundType = await db.query.memberTypes.findFirst({
                where: eq(memberTypes.name, oldType),
            });

            if (!foundStatus) {
                throw new Error("Status not found " + member.status);
            } else {
                run.statusFound = true
            }
            if (!foundType) {
                throw new Error("Type not found " + member.memberType);
            } else {
                run.typeFound = true
            }

            const newRecord = await db.insert(members).values({ 
                legacyId: member._id, 
                publish_phone: member.comms?.roster?.publishPhone || false, 
                publish_email: member.comms?.roster?.publishEmail || false, 
                waitingListNumber: member.waitingListNumber, 
                workObligation: member.workObligation, 
                status: foundStatus.id, 
                picture: member.picture,
                type: member.aim? 4: 
                foundType.id }).returning({ id: members.id });

            memberMapping[member._id] = newRecord[0].id
            run.memberRecord = newRecord[0].id
            if (member.memberInfo) {
                console.log('Member Info');
                const newPersonRecord = await db.insert(persons).values({ member: newRecord[0].id, occupation: member.occupation, firstName: member.memberInfo.firstName, lastName: member.memberInfo.lastName, email: member.memberInfo.email, type: MemberTypeId }).returning({ id: persons.id });
                run.memberInfo = true

                if (member.declerations) {
                    console.log('Declerations');
                    await db.insert(declerations).values({ person: newPersonRecord[0].id, isArcheryRO: member.declerations.isArcheryRO, isPistolRO: member.declerations.isPistolRO, isVeteran: member.declerations.isVeteran });
                    run.declerations = true
                };

                if (member.comms) {
                    if(member.comms.bulletin) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 1 });
                    }
                    if(member.comms.lists.fishing) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 2 });
                    }
                    if(member.comms.lists.lake) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 3 });
                    }
                    if(member.comms.lists.grounds) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 4 });
                    }
                    if(member.comms.lists.trap) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 5 });
                    }
                    if(member.comms.lists.archery) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 6 });
                    }
                    if(member.comms.lists.pistol) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 7 });
                    }
                    await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 8 });
                    if(member.comms.lists.dinner) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 9 });
                    }
                    await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 10 });

                    if(member.comms.forum.weeklyDigest) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 11 });
                    }

                    if(member.comms.forum.all) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 12 });
                    }

                    if(member.comms.forum.responses) {
                        await db.insert(membersToComms).values({ member: newRecord[0].id, comms: 13 });
                    }
                };
            }
            if (member.spouseInfo) {
                console.log('Spouse Info');
                await db.insert(persons).values({ member: newRecord[0].id, firstName: member.spouseInfo.firstName, lastName: member.spouseInfo.lastName, email: member.spouseInfo.email, type: SpouseTypeId });
                run.spouseInfo = true
            }
            if (member.dependants) {
                for (const dep in member.dependants) {
                    await db.insert(persons).values({ member: newRecord[0].id, birthdate: member.dependants[dep].birthDate, overrideBirthdate: member.dependants[dep].overrideBirthdate, comments: member.dependants[dep].comments, firstName: member.dependants[dep].firstName, lastName: member.dependants[dep].lastName, email: member.dependants[dep].email, type: SonTypeId });
                }
            }
            if (member.address) {
                console.log('Address Info', member.address);
                const postalCode = member.address.zip?.replace('-undefined', '');
                await db.insert(address).values({ member: newRecord[0].id, name: 'Home', line1: member.address.line1, line2: member.address.line2, city: member.address.city, state: member.address.state, zip: postalCode });
                run.address = true
            }
          
        } catch (error) {
            console.log(run)
            throw new Error(error.message)
        }
        processed++;
        console.log('Processed:', processed, 'of', memberRecordLength)
    }
}