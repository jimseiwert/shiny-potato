import "server-only";
import { db } from "../..";
import { statementTasks } from "../../schemas";
import { eq } from "drizzle-orm";

interface NewJobParam {
    statementId: number;
    badge: boolean;
    familyBadge: Boolean
    keycard: number;
    sticker: number;
    delivery: "mail" | "trap";
}

export async function AddPendingTask(props: NewJobParam): Promise<void> {
    await db.insert(statementTasks).values({
        statement: props.statementId,
        badge: props.badge,
        family_badge: props.familyBadge,
        keycard: props.keycard,
        sticker: props.sticker,
        delivery: props.delivery
    });
}

export async function RemovePendingTask(statementId: number): Promise<void> {
    await db.delete(statementTasks).where(eq(statementTasks.statement, statementId));
}
