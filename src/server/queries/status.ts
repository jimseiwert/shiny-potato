import "server-only";
import { db } from "../db";
import { status } from "../db/schemas/status";
import { and, eq } from "drizzle-orm";

export async function getAllStatus() {
    //const user = auth();

    //if (!user.userId) throw new Error("Unauthorized");

    const status = await db.query.status.findMany();

    return status;
}

export async function getStatus(id: number) {
    //const user = auth();

    const type = await db.query.status.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });

    if (!type) throw new Error("Type not found");

    return type;
}

export async function addStatusIfNotExist(newStatus: string): Promise<void> {
    //const user = auth();
    const allStatus = await getAllStatus();

    const statusExists = allStatus.find((status) => status.name === newStatus);

    if(!statusExists) {
        await addStatus(newStatus);
    }
    
    return;
}

export async function addStatus(newStatus: string): Promise<void> {
    //const user = auth();

    //if (!user.userId) throw new Error("Unauthorized");
    const page = {
        name: newStatus,
    }
    await db.insert(status).values(page);

    return;
}

export async function deleteStatus(id: number) {
    //const user = auth();
    //if (!user.userId) throw new Error("Unauthorized");

    await db
        .delete(status)
        .where(and(eq(status.id, id)));
}
