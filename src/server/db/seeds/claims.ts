import { permissions } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { Claim } from "@/server/enums/claims";
import { validateEntries } from "./util";
import { eq } from "drizzle-orm";
import { group } from "console";

export default async function seed(db: VercelPgDatabase) {

    const ClaimsList = [
        {name: "Admin Access", id: Claim.AdminAccess, group: "Admin"},
        {name: "Applications-Read", id: Claim.ApplicationsRead, group: "Applications" },
        {name: "Applications-Review", id: Claim.ApplicationsReview, group: "Applications" },
        {name: "Applications-Write", id: Claim.ApplicationsWrite, group: "Applications" },
        {name: "Bulletins-Read", id: Claim.BulletinsRead, group: "Bulletins" },
        {name: "Bulletins-Write", id: Claim.BulletinsWrite, group: "Bulletins" },
        {name: "Minutes-Read Draft", id: Claim.MinutesReadDraft , group: "Minutes"},
        {name: "Minutes-Read", id: Claim.MinutesRead , group: "Minutes"},
        {name: "Minutes-Write", id: Claim.MinutesWrite , group: "Minutes"},
        {name: "Minutes Upload", id: Claim.MinutesUpload , group: "Minutes"},
        {name: "Minutes-Executive Read", id: Claim.MinutesExecutiveRead , group: "Minutes"},
        {name: "Board-Read", id: Claim.BoardRead , group: "Board"},
        {name: "Board-Write", id: Claim.BoardWrite , group: "Board"},
        {name: "Dinners-Read", id: Claim.DinnersRead , group: "Dinners"},
        {name: "Dinners-Write", id: Claim.DinnersWrite , group: "Dinners"},
        {name: "Fishing-Read", id: Claim.FishingRead , group: "Fishing"},
        {name: "Fishing-Write", id: Claim.FishingWrite , group: "Fishing"},
        {name: "Members-Read", id: Claim.MembersRead , group: "Members"},
        {name: "Members-Sensitive Comments", id: Claim.MembersSensitiveComments , group: "Members"},
        {name: "Members-Sensitive Documents", id: Claim.MembersSensitiveDocuments , group: "Members"},
        {name: "Members-Create New", id: Claim.MembersCreateNew , group: "Members"},
        {name: "Members-Write", id: Claim.MembersWrite , group: "Members"},
        {name: "Members-Print Badge", id: Claim.MembersPrintBadge , group: "Members"},
        {name: "Statements-Read", id: Claim.StatementsRead , group: "Statements"},
        {name: "Statements-Write", id: Claim.StatementsWrite , group: "Statements"},
        {name: "Statements-Process Payment", id: Claim.StatementsProcessPayment , group: "Statements"},
        {name: "Statements-Read Batch", id: Claim.StatementsReadBatch , group: "Statements"},
        {name: "Statements-Read Config", id: Claim.StatementsReadConfig , group: "Statements"},
        {name: "Statements-Write Config", id: Claim.StatementsWriteConfig , group: "Statements"},
        {name: "Reports-Read", id: Claim.ReportsRead , group: "Reports"},
        {name: "Reports-Write", id: Claim.ReportsWrite , group: "Reports"},
        {name: "Conversion-Run", id:Claim.ConversionRun , group: "Conversion"},
        {name: "Letters-Read", id: Claim.LettersRead , group: "Letters"},
        {name: "Letters-Write", id: Claim.LettersWrite , group: "Letters"},
    
    ]

    const alreadyInserted = await db.query.permissions.findMany();

    console.log('Validating Entries');
    validateEntries(ClaimsList, alreadyInserted.map((x) => ({id: x.claimName, name: x.name})));
    
    console.log('Inserting Entries');

    for (const claim of ClaimsList) {
        const existing = await db.query.permissions.findFirst({ where: eq(permissions.claimName, claim.id) });
        if (existing) {
            await db.update(permissions).set({name : claim.name, group: claim.group}).where(eq(permissions.claimName, claim.id)) ;
            continue;
        }

        await db.insert(permissions).values({name: claim.name, claimName: claim.id});
    }

}