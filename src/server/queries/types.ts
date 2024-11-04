import "server-only";
import { db } from "../db";
import { memberTypes } from "../db/schemas/types";
import { and, eq } from "drizzle-orm";

export async function getTypes() {
    //const user = auth();

    //if (!user.userId) throw new Error("Unauthorized");

    const types = await db.query.types.findMany();

    return types;
}

export async function addTypeIfNotExist(newType: string): Promise<void> {
    //const user = auth();
    const allTypes = await getTypes();

    const typeExists = allTypes.find((type) => type.name === newType);

    if(!typeExists) {
        await addType(newType);
    }
    
    return;
}

export async function getType(id: number) {
    //const user = auth();

    const type = await db.query.types.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });

    if (!type) throw new Error("Type not found");

    return type;
}

export async function addType(memberType: string): Promise<void> {
    //const user = auth();

    //if (!user.userId) throw new Error("Unauthorized");
    const page = {
        name: memberType,
    }
    await db.insert(types).values(page);

    return;
}

export async function deleteType(id: number) {
    //const user = auth();
    //if (!user.userId) throw new Error("Unauthorized");

    await db
        .delete(types)
        .where(and(eq(types.id, id)));
}
