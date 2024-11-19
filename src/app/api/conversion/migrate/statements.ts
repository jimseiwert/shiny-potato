import { members, payments, statementConfig, statementLines } from "@/server/db/schemas";
import { db } from "../../../../server/db";
import statement from "@/server/db/schemas/statement";
import { eq } from "drizzle-orm";
import { printProgress } from "./utils";
import { StatementType } from "@/server/enums/statementTypes";

interface Item {
    item: string,
    qty: number,
    maxQty: number,
    unitCost: number,
    canChangeQty: boolean,
    canChangeTotal: boolean,
    canChangeName: boolean,
    initiation: boolean,
    yearly: boolean,
    prorated: boolean,
    admin: boolean
}
interface Config {
    fullMember: Item[];
    shootingMember: Item[];
    aimMember: Item[];
    employee: Item[];
    dinner: Item[];
    guestFishing: Item[];
}

interface Statement {
    batch: string
    paymentAmount: number
    checkNumber: string
    cash: boolean
    memberType: string
    member: string
    createdBy: string
    created: Date
    updated_at: Date
    addedDate: Date
    paidDate: Date
    year: number
    addedBy: string
    description: string
    exception: boolean
    canPayOnline: boolean
    items: [{
        id: string
        item: string
        qty: number
        unitCost: number
        maxQty: number
        canChangeTotal: boolean
        canChangeQty: boolean
    }]
}

async function insertItem(memberType: number, item: Item) {
    await db.insert(statementConfig).values({
        item: item.item,
        description: item.item,
        defaultQty: item.qty,
        maxQty: item.maxQty,
        canChangeQty: Boolean(item.canChangeQty),
        canChangeCost: Boolean(item.canChangeTotal),
        canChangeName: Boolean(item.canChangeName),
        requiredInitiation: Boolean(item.initiation),
        requiredRenewal: Boolean(item.yearly),
        adminOnly: Boolean(item.admin),
        prorate: 'none',
        memberType: memberType,
        cost: item.unitCost
    });
}
export async function Statements(data: Statement[], config: Config[]) {
    //await db.execute('TRUNCATE TABLE statement_activity RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE payments RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE statement_lines RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE statement RESTART IDENTITY CASCADE');
    await db.execute('TRUNCATE TABLE statement_config RESTART IDENTITY CASCADE');
    const memberTypes = await db.query.memberTypes.findMany();


    const fullStatementLines = [
        { item: 'Dues', id: 2 },
        { item: 'Bulletin Fee', id: 9 },
        { item: 'Fishing Contribution', id: 5 },
        { item: 'Tree Contribution', id: 6 },
        { item: 'Key Card', id: 11 },
        { item: 'Initiation Fee', id: 1 },
        { item: 'Fine: Late Payment', id: 14 },
        { item: 'Shooting Member Due Credit', id: 15 },
        { item: "Woman's Committee Contribution", id: 8 },
        { item: 'SOB Dinner Meeting Winner', id: 15 },
        { item: 'Sporting Clay Winner', id: 15 },
        // {item: 'Credit Card Fee', id: 0},
        { item: 'Raffle Tickets', id: 22 },
        { item: 'SOB Winner', id: 15 },
        { item: 'NSF: Return Fee', id: 15 },
        { item: 'Camping Contribution', id: 7 },
        { item: 'Dues (prorate)', id: 16 },
        { item: 'Work Party Buyout', id: 13 },
        { item: 'Extra Table', id: 21 },
        { item: 'Archery Contribution', id: 3 },
        { item: 'Pistol Contribution', id: 4 },
        { item: 'Dues-Trap Chairman Waived', id: 15 },
        { item: 'Chuck Smith Refund', id: 15 },
        { item: 'Shooting Member Dues Prorate', id: 16 },
        { item: 'Extra Key Card', id: 11 },
        { item: 'Family Badge', id: 10 },
        { item: 'Voluntary Fishing Contribution', id: 5 },
        { item: 'Voluntary Pistol Contribution', id: 4 },
        { item: 'Voluntary Archery Contribution', id: 3 },
        { item: 'Voluntary Camping Contribution', id: 7 },
        { item: 'Voluntary Tree Contribution', id: 6 },
        { item: 'Woman Committee Contribution', id: 8 },
        { item: 'Trap Chairman Dues Waived', id: 15 },
        { item: 'Guest Fishing - Book', id: 18 },
        { item: 'Fees', id: 15 },
        { item: 'Guest Fishing - Single Day ', id: 17 },
        { item: 'Guest Fishing Book', id: 18 },
        { item: 'Guest Fishing - Single', id: 17 },
        { item: 'Late Payment Fee', id: 14 },
        { item: 'Trap Shooting Card', id: 15 },
        { item: 'Guest Fishing - Single Day', id: 17 },
        { item: 'Bulletin Fee - Paper', id: 9 },
        { item: 'Window Sticker', id: 26 },
        { item: 'Voluntary Picnic Contribution', id: 25 },
        { item: 'Trap Chairman Board Dues', id: 15 },
        { item: 'Manual Adjustment', id: 15 },
        { item: 'Manual Adjustment-Dues Adjustment', id: 15 },
        { item: '2023 Buyout Adjustment', id: 15 },
        { item: '2023 Work Party Buyout Adjustment', id: 15 },
        { item: 'Voluntary Trap Contribution', id: 15 },
        { item: '2023 Work Party Adjustment', id: 15 },
        { item: 'Dues Prorate', id: 16 },
    ];
    const shootingStatementLines = [
        { item: 'Dues', id: 28 },
        // {item: 'Fishing Contribution', id: 0},
        // {item: "Woman's Committee Contribution", id: 0},
        // {item: 'Family Badge', id: 0},
        // {item: 'Credit Card Fee', id: 0},
        { item: 'Initiation Fee', id: 27 },
        // {item: 'Fine: Late Payment', id: 0},
        // {item: 'Over payment', id: 0},
        // {item: 'Club Shoot Winner', id: 0},
        // {item: 'Special Assessment', id: 0},
        // {item: 'Special Assessment Late Fee', id: 0},
        // {item: 'Dues (prorate)', id: 0},
        { item: 'Shooting Membership Drive', id: 30 },
        { item: 'Trap Donation', id: 31 },
    ]

    for (const configDoc of config) {
        const aimMemberType = memberTypes.find((m) => m.name === 'AIM');
        const fullMemberType = memberTypes.find((m) => m.name === 'Full');
        const shootingMemberType = memberTypes.find((m) => m.name === 'Shooting');
        const employeeMemberType = memberTypes.find((m) => m.name === 'Employee');

        if (!aimMemberType || !fullMemberType || !shootingMemberType || !employeeMemberType) {
            throw new Error('No member type found');
        }

        for (const item of configDoc.fullMember) {
            await insertItem(fullMemberType.id, item);
        }

        for (const item of configDoc.shootingMember) {
            await insertItem(shootingMemberType.id, item);
        }

        for (const item of configDoc.employee) {
            await insertItem(employeeMemberType.id, item);
        }

        for (const item of configDoc.aimMember) {
            await insertItem(aimMemberType.id, item);
        }
    }


    const typeMapping = [
        { "type": 'Dues', id: StatementType.Dues },
        { "type": 'Initiation', id: StatementType.Initiation },
        { "type": 'Initation', id: StatementType.Initiation },
        { "type": 'Work Fine', id: StatementType.Supplemental },
        { "type": 'Supplemental', id: StatementType.Supplemental },
        { "type": 'Special Assessment', id: StatementType.SpecialAssessment },
        { "type": 'Picnic', id: StatementType.Supplemental },
        { "type": '10 Year Buyout', id: StatementType.Supplemental },
        { "type": 'Guest Fishing', id: StatementType.Supplemental },
    ]
    data = data.filter((m) => m.batch);
    let count = 0;
    for (const doc of data) {
        let paidDate = doc.batch.toLowerCase() || doc.year + '-12-31';
        paidDate = paidDate.replace('stripe-', '');
        paidDate = paidDate.replace('s-', '');
        paidDate = paidDate.replace('f-', '');

        if (!Date.parse(paidDate)) {
            paidDate = doc.year + '-12-31';
        }

        doc.paidDate = new Date(paidDate);
        for (const item of doc.items) {
            if (item.id === '' && item.item === 'Credit Card Fee') {
                item.id = 'credit-card-fee';
            }
            if (item.id === '' && item.item === 'Dues') {
                item.id = 'dues';
            }
            if (item.id === '' && item.item === 'Family Badge') {
                item.id = 'family-badge';
            }
            if (item.item === '') {
                console.log(item);
                throw new Error('No item id');
            }
            const line = doc.memberType === 'full' ? fullStatementLines.find((m) => m.item === item.item) : shootingStatementLines.find((m) => m.item === item.item);
            if (!line) {
                const newLine = await db.insert(statementConfig).values({
                    item: item.item,
                    description: item.item,
                    defaultQty: 1,
                    maxQty: 1,
                    prorate: 'none',
                    memberType: doc.memberType === 'full' ? 1 : 2,
                }).returning({ id: statementConfig.id });

                if (doc.memberType === 'full') {
                    fullStatementLines.push({ item: item.item, id: newLine[0].id });
                } else {
                    shootingStatementLines.push({ item: item.item, id: newLine[0].id });
                }
            }
        }
        count++;
        console.log(`Statements migrated: ${count} of ${data.length}`);
    }

    count = 0;
    for (const doc of data) {
        const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, doc.member + '') });
        if (!memberRecord) {
            throw new Error('No member found ' + doc.member);
        }
        const stmntType = typeMapping.find((m) => m.type === doc.description);

        if (!stmntType) {
            throw new Error('No statement type found ' + doc.description);
        }

        const StmntRecord = await db.insert(statement).values({
            member: memberRecord.id,
            createdBy: 118,
            year: doc.year,
            createdAt: doc.created,
            type: stmntType.id,
        }).returning({ id: statement.id });

        if (!StmntRecord) {
            throw new Error('No statement created ' + doc.description);
        }
        const lines = doc.items.filter((item) => item.item != 'Credit Card Fee').map((item) => {
            const line = doc.memberType === 'full' ? fullStatementLines.find((m) => m.item === item.item) : shootingStatementLines.find((m) => m.item === item.item);
            if (!line) {
                throw new Error('No statement line found ' + item.item);
            }
            return {
                statement: StmntRecord[0].id,
                item: line.id,
                qty: item.qty,
                unitCost: item.unitCost || 0,
                noted: line.id === 15 ? item.item : '',
            }
        })

        await db.insert(statementLines).values(lines);

        await db.insert(payments).values({
            statement: StmntRecord[0].id,
            method: doc.cash ? 'cash' : doc.batch.toLowerCase().includes('stripe') ? 'credit' : 'check',
            batch: doc.batch,
            amount: doc.paymentAmount || 0,
            fee: doc.items.filter(((item) => item.item === 'Credit Card Fee')).reduce((acc, val) => {
                return acc + (val.qty * val.unitCost);
            }, 0) * -1,
            confirmation: doc.checkNumber,
            createdAt: doc.paidDate,
        });

        count++;
        printProgress(`Statements migrated: ${count} of ${data.length}`);
    }
}