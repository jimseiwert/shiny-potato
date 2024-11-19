import { activity, statementLines } from "../../schemas";
import { db } from "../..";
import statement from "../../schemas/statement";
import { StatementType } from "@/server/enums/statementTypes";

export async function CreateStatement(memberId: number, year: number) {
    const StmntRecord = await db.insert(statement).values({
        member: memberId,
        createdBy: 118,
        year: year,
        createdAt: new Date(),
        type: StatementType.Dues,
    }).returning({ id: statement.id });

    if (!StmntRecord) {
        throw new Error('No statement created ' + doc.description);
    }

    const lines = [
        {statement: StmntRecord[0].id, item: 2, qty: 1, unitCost: 450},
    ]

    await db.insert(statementLines).values(lines);

    await db.insert(activity).values({
        statement: StmntRecord[0].id,
        type: 'system',
        activity: "Statement Created",
        createdAt: new Date(),
        createdBy: 118,
    });
    
}


