import { comms } from "../schemas";
import type db from "./../index";
import { eq } from "drizzle-orm";
import { Comms } from "@/server/enums/comms";
import { validateEntries } from "./util";

export default async function seed(db: db) {

    const CommsList = [
        { id: Comms.Bulletin, name: "Bulletin" },
        { id: Comms.Fishing, name: "Fishing" },
        { id: Comms.LakeandBeach, name: "Lake and Beach" },
        { id: Comms.GroundsandMaintenance, name: "Grounds and Maintenance" },
        { id: Comms.Trap, name: "Trap" },
        { id: Comms.Archery, name: "Archery" },
        { id: Comms.Pistol, name: "Pistol" },
        { id: Comms.Hunting, name: "Hunting" },
        { id: Comms.Dinner, name: "Dinner" },
        { id: Comms.Membership, name: "Membership" },
        { id: Comms.ForumWeekly, name: "Forum - Weekly" },
        { id: Comms.ForumAllPosts, name: "Forum - All Posts" },
        { id: Comms.ForumResponses, name: "Forum - Responses" }
    ];

    const alreadyInserted = await db.query.permissions.findMany();

    console.log('Validating Entries');
    validateEntries(CommsList, alreadyInserted);
    
    console.log('Inserting Entries');
    
    for (const list of CommsList) {
        const existing = await db.query.comms.findFirst({ where: eq(comms.id, list.id) });
        if (existing) {
            continue;
        }

        await db.insert(comms).values(list);
    }


}