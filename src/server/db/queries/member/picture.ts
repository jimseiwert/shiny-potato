import "server-only";
import { db } from "../..";
import { members } from "../../schemas";
import { eq } from "drizzle-orm";

export async function UpdatePicture(auth0: string, imageUrl: string) {
    await db.update(members)
        .set({picture: imageUrl})
        .where(eq(members.auth0, auth0));
}