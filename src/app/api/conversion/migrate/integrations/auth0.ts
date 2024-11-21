import { auth0, GetUsers, GetRules } from "@/lib/auth0";
import { db } from "@/server/db";
import { integrations, members } from "@/server/db/schemas";
import { eq } from "drizzle-orm";
export async function Auth0() {
const rules = await GetRules();
    // const users = await GetUsers();

    // let count = 0;
    // for (const user of users) {
    //     const member = await db.query.members.findFirst({
    //         where: eq(members.legacyId, user.app_metadata.userId)
    //     })

    //     if (!member) {
    //         console.log(user)
    //         throw new Error('Member not found for', user)
    //     }

    //     await db.insert(integrations).values({ member: member.id, auth0: user.user_id })
    //     count++;
    //     console.log(`Added ${count} of ${users.length} users`)
    // }

}