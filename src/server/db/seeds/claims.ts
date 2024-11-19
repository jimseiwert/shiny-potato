import { permissions } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { Claim } from "@/server/enums/claims";
import { validateEntries } from "./util";
import { eq } from "drizzle-orm";

export default async function seed(db: VercelPgDatabase) {

    const ClaimsList = [
        {name: "Admin Access", id: Claim.AdminAccess },
        {name: "Applications-Read", id: Claim.ApplicationsRead },
        {name: "Applications-Review", id: Claim.ApplicationsReview },
        {name: "Applications-Write", id: Claim.ApplicationsWrite },
        {name: "Bulletins-Read", id: Claim.BulletinsRead },
        {name: "Bulletins-Write", id: Claim.BulletinsWrite },
        {name: "Minutes-Read Draft", id: Claim.MinutesReadDraft },
        {name: "Minutes-Read", id: Claim.MinutesRead },
        {name: "Minutes-Write", id: Claim.MinutesWrite },
        {name: "Minutes Upload", id: Claim.MinutesUpload },
        {name: "Minutes-Executive Read", id: Claim.MinutesExecutiveRead },
        {name: "Board-Read", id: Claim.BoardRead },
        {name: "Board-Write", id: Claim.BoardWrite },
        {name: "Dinners-Read", id: Claim.DinnersRead },
        {name: "Dinners-Write", id: Claim.DinnersWrite },
        {name: "Fishing-Read", id: Claim.FishingRead },
        {name: "Fishing-Write", id: Claim.FishingWrite },
        {name: "Members-Read", id: Claim.MembersRead },
        {name: "Members-Sensitive Comments", id: Claim.MembersSensitiveComments },
        {name: "Members-Sensitive Documents", id: Claim.MembersSensitiveDocuments },
        {name: "Members-Create New", id: Claim.MembersCreateNew },
        {name: "Members-Write", id: Claim.MembersWrite },
        {name: "Members-Print Badge", id: Claim.MembersPrintBadge },
        {name: "Statements-Read", id: Claim.StatementsRead },
        {name: "Statements-Write", id: Claim.StatementsWrite },
        {name: "Statements-Process Payment", id: Claim.StatementsProcessPayment },
        {name: "Statements-Read Batch", id: Claim.StatementsReadBatch },
        {name: "Statements-Read Config", id: Claim.StatementsReadConfig },
        {name: "Statements-Write Config", id: Claim.StatementsWriteConfig },
        {name: "Reports-Read", id: Claim.ReportsRead },
        {name: "Reports-Write", id: Claim.ReportsWrite },
        {name: "Conversion-Run", id:Claim.ConversionRun },
        {name: "Letters-Read", id: Claim.LettersRead },
        {name: "Letters-Write", id: Claim.LettersWrite },
    
    ]

    const alreadyInserted = await db.query.permissions.findMany();

    console.log('Validating Entries');
    validateEntries(ClaimsList, alreadyInserted.map((x) => ({id: x.claimName, name: x.name})));
    
    console.log('Inserting Entries');

    for (const claim of ClaimsList) {
        const existing = await db.query.permissions.findFirst({ where: eq(permissions.claimName, claim.id) });
        if (existing) {
            continue;
        }

        await db.insert(permissions).values({name: claim.name, claimName: claim.id});
    }

}