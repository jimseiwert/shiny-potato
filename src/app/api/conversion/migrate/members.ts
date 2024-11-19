import { db } from "../../../../server/db";
import { members, address, declerations, membersToComms, persons, memberStatusesHistory, memberStatusHistory, activity } from "../../../../server/db/schemas";
import { MemberStatus } from "@/server/enums/status";
import { Comms } from "@/server/enums/comms";
import { MemberType } from "@/server/enums/memberTypes";
import { PersonType } from "@/server/enums/personType";
import { printProgress } from "./utils";

export async function Members(data: any[]) {
    await db.execute('TRUNCATE TABLE activity RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE address RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE persons RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE members RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE member_status_history RESTART IDENTITY CASCADE');

    const statusMapping = (oldStatus: number) => {
        switch (oldStatus) {
            case 0:
                return MemberStatus.BulletinOnly;
            case 1:
                return MemberStatus.Deceased;
            case 2:
                return MemberStatus.DroppedOut;
            case 3:
                return MemberStatus.Inactive;
            case 4:
                return MemberStatus.Lifetime;
            case 5:
                return MemberStatus.Paid;
            case 6:
                return MemberStatus.RenewalPending;
            case 7:
                return MemberStatus.TermByBoard;
            case 8:
                return MemberStatus.WaitingList;
            case 9:
                return MemberStatus.Widow;
            case 10:
                return MemberStatus.Undetermined;
            case 11:
                return MemberStatus.Banned;
            case 12:
                return MemberStatus.NonPayment;
            case 13:
                return MemberStatus.Vendor;
            case 14:
                return MemberStatus.Guest;
            case 15:
                return MemberStatus.MembershipDeclined;
            case 16:
                return MemberStatus.OnHold;
            case 17:
                return MemberStatus.ApplicationSubmitted;
            case 18:
                return MemberStatus.Inducted;
            case 19:
                return MemberStatus.ApplicationRequested;
            case 20:
                return MemberStatus.NotInGoodStanding;
        }
    }

    const typeMapping = (oldType: string) => {
        switch (oldType) {
            case 'full':
                return MemberType.Full;
            case 'shooting':
                return MemberType.Shooting;
            case 'employee':
                return MemberType.Employee;
            case 'aim':
                return MemberType.AIM;
        }
    }

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
            member.address.state.toString().toLowerCase() === 'illinois')) {
            member.address.state = 'IL'
        }

        if (states.includes(data[doc].address.state) === false) {
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
        try {
            const member = data[doc]
            const oldStatus = statusMapping(member.status)
            const oldType = typeMapping(member.memberType)

            if (!oldStatus) {
                throw new Error("Status not found " + member.status);
            } 
            if (!oldType) {
                throw new Error("Type not found " + member.memberType);
            } 

            const newRecord = await db.insert(members).values({
                legacyId: member._id,
                publish_phone: member.comms?.roster?.publishPhone || false,
                publish_email: member.comms?.roster?.publishEmail || false,
                waitingListNumber: member.waitingListNumber,
                workObligation: member.workObligation,
                status: oldStatus,
                picture: member.picture,
                type: member.aim ? MemberType.AIM : oldType
            }).returning({ id: members.id });

            const memberId = newRecord[0].id;

            if (member.memberInfo) {
                const newPersonRecord = await db.insert(persons).values({ member: memberId, occupation: member.occupation, firstName: member.memberInfo.firstName, lastName: member.memberInfo.lastName, email: member.memberInfo.email, homePhone: member.memberInfo.homePhone, cellPhone: member.memberInfo.cellPhone, type: PersonType.Member }).returning({ id: persons.id });

                if (!newPersonRecord) {
                    throw new Error('Unable to Create Member Person Entry');
                }
                const memberPersonId = newPersonRecord[0].id;
                await Declerations(memberPersonId, member)
                await Address(memberId, member)
                await Spouse(memberId, member)
                await Dependants(memberId, member)
                await CommsEntry(memberId, member)

            } else {
                throw new Error('No Member Info')
            }
        
        } catch (error) {
            throw new Error(error)
        }
        processed++;
        printProgress(`Processed: ${processed} of ${memberRecordLength}`)
    }
}



async function Declerations(memberId: number, member: any) {
    if (member.declerations) {
        await db.insert(declerations).values({
            person: memberId,
            isArcheryRO: member.declerations.isArcheryRO,
            isPistolRO: member.declerations.isPistolRO,
            isVeteran: member.declerations.isVeteran,
            createdBy: memberId,
            createdAt: new Date()
        });
    };
}
async function Spouse(memberId: number, member: any) {
    if (member.spouseInfo) {
        await db.insert(persons).values({ 
            member: memberId, 
            firstName: member.spouseInfo.firstName, 
            lastName: member.spouseInfo.lastName, 
            email: member.spouseInfo.email === "{}" ? null : member.spouseInfo.email, 
            homePhone: member.spouseInfo.homePhone, 
            cellPhone: member.spouseInfo.cellPhone, 
            type: PersonType.Spouse,
            createdBy: memberId,
            createdAt: new Date()
         });
    }
}
async function Dependants(memberId: number, member: any) {
    if (member.dependants) {
        for (const dep in member.dependants) {
            await db.insert(persons).values({ 
                member: memberId, 
                birthdate: member.dependants[dep].birthDate, 
                overrideBirthdate: member.dependants[dep].overrideBirthdate, 
                comments: member.dependants[dep].comments, 
                firstName: member.dependants[dep].firstName, 
                lastName: member.dependants[dep].lastName, 
                email: member.dependants[dep].email, 
                type: PersonType.Son,
                createdBy: memberId,
                createdAt: new Date()
             });
        }
    }
}
async function Address(memberId: number, member: any) {
    if (member.address) {
        const postalCode = member.address.zip?.replace('-undefined', '');
        await db.insert(address).values({ 
            member: memberId, 
            name: 'Home', 
            line1: member.address.line1, 
            line2: member.address.line2, 
            city: member.address.city, 
            state: member.address.state, 
            zip: postalCode,
            createdBy: memberId,
            createdAt: new Date()
        });
    }
}
async function CommsEntry(memberId: number, member: any) {
    if (member.comms) {
        if (member.comms.bulletin) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Bulletin });
        }
        if (member.comms.lists.fishing) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Fishing });
        }
        if (member.comms.lists.lake) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.LakeandBeach });
        }
        if (member.comms.lists.grounds) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.GroundsandMaintenance });
        }
        if (member.comms.lists.trap) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Trap });
        }
        if (member.comms.lists.archery) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Archery });
        }
        if (member.comms.lists.pistol) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Pistol });
        }
        await db.insert(membersToComms).values({ member: memberId, comms: Comms.Hunting });
        if (member.comms.lists.dinner) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.Dinner });
        }
        await db.insert(membersToComms).values({ member: memberId, comms: Comms.Membership });

        if (member.comms.forum.weeklyDigest) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.ForumWeekly });
        }

        if (member.comms.forum.all) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.ForumAllPosts });
        }

        if (member.comms.forum.responses) {
            await db.insert(membersToComms).values({ member: memberId, comms: Comms.ForumResponses });
        }
    };
}









