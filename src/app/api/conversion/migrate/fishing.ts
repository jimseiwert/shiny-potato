import { db } from "@/server/db";
import { members } from "@/server/db/schemas";
import fishingPass from "@/server/db/schemas/fishing-pass";
import { error } from "console";
import { eq } from "drizzle-orm";
import { printProgress } from "./utils";

export async function Fishing(data: any[]) {
    await db.execute('TRUNCATE TABLE fishing_pass RESTART IDENTITY CASCADE');
    console.log(data[0]);

    const years = Array.from(new Set(data.map((f) => f.year)));
    console.log(years);

    for (const year of years) {
        console.log('Checking year ' + year);
        let passes = data.filter((f) => f.year === year);
        const passNumbers = Array.from(new Set(passes.map((f) => f.number)));

        console.log('Checking for duplicates ' + passes.length + '/' + passNumbers.length);
        let dups = 0;
        let tobedeleted = []
        for (const pass of passNumbers) {
            const passCount = passes.filter((f) => f.number === pass);
            if (passCount.length > 1) {
                dups++;
                const passToRemove = passCount.find((f) => f.guest === null);
                if (!passToRemove) {
                    throw new error('No guest pass found for year ' + year + ' pass ' + pass);
                }
                if (passCount.length > 2) {
                    throw new error('Too many to handle ' + year + ' pass ' + pass);
                }
                if (passCount.length > 1) {
                    tobedeleted.push(passToRemove.number)
                }
                printProgress('Duplicate fishing pass found for year ' + year + ' pass ' + pass);
            }
        }
        console.log(dups)
        console.log(tobedeleted)

        console.log('Passes before deletion ' + passes.length);
        passes = passes.filter((f) => !tobedeleted.includes(f.number));
        console.log('Passes after deletion ' + passes.length);







        let count = 0;
        for (const f of passes) {
            const memberRecord = await db.query.members.findFirst({ where: eq(members.legacyId, f.member + '') });
            if (memberRecord) {

                await db.insert(fishingPass).values({
                    year: f.year,
                    pass: Number(f.number.replace('W', '')),
                    guest: f.guest,
                    used: f.guest != null,
                    member: memberRecord.id,
                })
            }
            count++;
            printProgress(`Fishing passes migrated: ${count} of ${passes.length}`);
        }
    }




}