import { db } from "../../../../server/db";
import { eq, or } from "drizzle-orm";
import { members, persons, address, declerations, memberStatus, memberTypes, state } from "../../../../server/db/schemas";

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
    const MemberTypeId = personTypes.find((x: personTypes) => x.name === 'Member').id
    const SpouseTypeId = personTypes.find((x: personTypes) => x.name === 'Spouse').id

    const memberMapping: any = {};


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

        if (member.address.state === 'US' || member.address.state === '60126-2236' || member.address.state === 'ILLINOIS') {
            member.address.state = 'IL'
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
    let dataConversion: any[] = [];
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

            const newRecord = await db.insert(members).values({ legacyId: member._id, picture: member.picture, waitingListNumber: member.waitingListNumber, workObligation: member.workObligation, status: foundStatus.id, type: foundType.id }).returning({ id: members.id });
            memberMapping[member._id] = newRecord[0].id
            run.memberRecord = newRecord[0].id
            if (member.memberInfo) {
                console.log('Member Info');
                await db.insert(persons).values({ member: newRecord[0].id, occupation: member.occupation, firstName: member.memberInfo.firstName, lastName: member.memberInfo.lastName, email: member.memberInfo.email, type: MemberTypeId });
                run.memberInfo = true
            }
            if (member.spouseInfo) {
                console.log('Spouse Info');
                await db.insert(persons).values({ member: newRecord[0].id, firstName: member.spouseInfo.firstName, lastName: member.spouseInfo.lastName, email: member.spouseInfo.email, type: SpouseTypeId });
                run.spouseInfo = true
            }
            if (member.address) {
                console.log('Address Info');
                const postalCode = member.address.zip?.replace('-undefined', '');
                const stateRecord = await db.query.state.findFirst({ where: or(eq(state.code, member.address.state), eq(state.name, member.address.state)) });
                if (!stateRecord) {
                    throw new Error("State not found " + member.address.state);
                } 
                await db.insert(address).values({ member: newRecord[0].id, name: 'Home', line1: member.address.line1, line2: member.address.line2, city: member.address.city, state: stateRecord.id, zip: postalCode });
                run.address = true
            }
            if (member.declerations) {
                console.log('Declerations');
                await db.insert(declerations).values({ member: newRecord[0].id, isArcheryRO: member.declerations.isArcheryRO, isPistolRO: member.declerations.isPistolRO, isVeteran: member.declerations.isVeteran });
                run.declerations = true
            };
        } catch (error) {
            run.error = error.message
            console.log(run)
            //console.log(member)
            dataConversion.push(run)

        }
        processed++;
        console.log('Processed:', processed, 'of', memberRecordLength)
    }

    console.log('**** Errors ****')
    console.log(dataConversion)
    console.log('**** Errors ****')

    if(dataConversion.length > 0) {
        throw new Error('Member Seeded with Errors');
    }
}