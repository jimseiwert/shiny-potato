import { roles } from "../schemas";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { Roles } from "@/server/enums/roles";
import { eq } from "drizzle-orm";
import { validateEntries } from "./util";

export default async function seed(db: VercelPgDatabase) {

    const RoleList = [
        {id: Roles.President, name: "President", group: "Officers", email:"president@maywoodsc.org"},
        {id: Roles.VicePresident, name: "Vice-President", group: "Officers", email:null},
        {id: Roles.Treasurer, name: "Treasurer", group: "Officers", email:"treasurer@maywoodsc.org"},
        {id: Roles.FinancialSecretary, name: "Financial Secretary", group: "Officers", email:"financialsecretary@maywoodsc.org"},
        {id: Roles.RecordingSecretary, name: "Recording Secretary", group: "Officers", email:null},
        {id: Roles.ChairmanoftheBoard, name: "Chairman of the Board", group: "Directors", email:null},
        {id: Roles.ImmediatePastPresident, name: "Immediate Past President", group: "Directors", email:null},
        {id: Roles.Director, name: "Director", group: "Directors", email:null},
        {id: Roles.Archery, name: "Archery", group: "Chairman", email:"archery@maywoodsc.org"},
        {id: Roles.AssetManager, name: "Asset Manager", group: "Chairman", email:"archery@maywoodsc.org"},
        {id: Roles.Bulletin, name: "Bulletin", group: "Chairman", email:"bulletin@maywoodsc.org"},
        {id: Roles.Camping, name: "Camping", group: "Chairman", email:"camping@maywoodsc.org"},
        {id: Roles.Dinner, name: "Dinner", group: "Chairman", email:"dinner@maywoodsc.org"},
        {id: Roles.Fishing, name: "Fishing", group: "Chairman", email:"fishing@maywoodsc.org"},
        {id: Roles.GameRoom, name: "Game Room", group: "Chairman", email:null},
        {id: Roles.GroundsandMaintenance, name: "Grounds and Maintenance", group: "Chairman", email:"grounds@maywoodsc.org"},
        {id: Roles.Hunting, name: "Hunting", group: "Chairman", email:"hunting@maywoodsc.org"},
        {id: Roles.InternalAudit, name: "Internal Audit", group: "Chairman", email:null},
        {id: Roles.Kitchen, name: "Kitchen", group: "Chairman", email:null},
        {id: Roles.LakeandBeach, name: "Lake and Beach", group: "Chairman", email:null},
        {id: Roles.Membership, name: "Membership", group: "Chairman", email:"membership@maywoodsc.org"},
        {id: Roles.Picnic, name: "Picnic", group: "Chairman", email:"picnic@maywoodsc.org"},
        {id: Roles.RifleandPistol, name: "Rifle and Pistol", group: "Chairman", email:"pictol@maywoodsc.org"},
        {id: Roles.SOB, name: "SOB", group: "Chairman", email:null},
        {id: Roles.Trap, name: "Trap", group: "Chairman", email:"trap@maywoodsc.org"},
        {id: Roles.WebMaster, name: "Web Master and IT", group: "Chairman", email:"webmaster@maywoodsc.org"},
        {id: Roles.WomensLiaison, name: "Women's Liaison", group: "Chairman", email:"woman@maywoodsc.org"}
    ]

    const alreadyInserted = await db.query.roles.findMany();

    console.log('Validating Entries');
    validateEntries(RoleList, alreadyInserted);
    
    console.log('Inserting Entries');

    for (const role of RoleList) {
        const existing = await db.query.roles.findFirst({ where: eq(roles.id, role.id) });
        if (existing) {
            continue;
        }

        await db.insert(roles).values(role);
    }

}