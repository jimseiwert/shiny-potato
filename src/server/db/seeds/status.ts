import { MemberStatus } from "@/server/enums/status";
import { memberStatus } from "../schemas";
import type { db }  from "./../index";
import { eq } from "drizzle-orm";
import { validateEntries } from "./util";
export default async function seed(db: db) {

    const StatusOptions = [
        {id: Number(MemberStatus.Paid), name:"Paid",color:"badge-active", active: true},
        {id: MemberStatus.Lifetime, name:"Lifetime",color:"badge-active", active: true},
        {id: MemberStatus.BulletinOnly, name:"Bulletin Only",color:"badge-warning", active: false},
        {id: MemberStatus.Deceased, name:"Deceased",color:"badge-terminated", active: false},
        {id: MemberStatus.DroppedOut, name:"Dropped Out",color:"badge-terminated", active: false},
        {id: MemberStatus.Inactive, name:"Inactive",color:"badge-terminated", active: false},
        {id: MemberStatus.RenewalPending, name:"Renewal Pending",color:"badge-warning", active: true},
        {id: MemberStatus.TermByBoard, name:"Term By Board",color:"badge-terminated", active: false},
        {id: MemberStatus.WaitingList, name:"Waiting List",color:"badge-warning", active: false},
        {id: MemberStatus.Widow, name:"Widow",color:"badge-active", active: true},
        {id: MemberStatus.Undetermined, name:"Undetermined",color:"badge-terminated", active: false},
        {id: MemberStatus.Banned, name:"Banned",color:"badge-terminated", active: false},
        {id: MemberStatus.NonPayment, name:"Non-Payment",color:"badge-terminated", active: false},
        {id: MemberStatus.Vendor, name:"Vendor",color:"badge-warning", active: false},
        {id: MemberStatus.Guest, name:"Guest",color:"badge-warning", active: false},
        {id: MemberStatus.MembershipDeclined, name:"Membership Declined",color:"badge-terminated", active: false},
        {id: MemberStatus.OnHold, name:"On Hold",color:"badge-warning", active: false},
        {id: MemberStatus.ApplicationSubmitted, name:"Application Submitted",color:"badge-warning", active: false},
        {id: MemberStatus.Inducted, name:"Induct",color:"badge-warning", active: false},
        {id: MemberStatus.ApplicationRequested, name:"Application Requested",color:"badge-warning", active: false},
        {id: MemberStatus.ReinstatementGranted, name:"Reinstatement Granted",color:"badge-warning", active: false},
        {id: MemberStatus.NotInGoodStanding, name:"Not In Good Standing",color:"badge-warning", active: true}
    ]

    const alreadyInserted = await db.query.memberStatus.findMany();

    console.log('Validating Entries');
    validateEntries(StatusOptions, alreadyInserted);
    
    console.log('Inserting Entries');

    for(const status of StatusOptions) {
        const existing = await db.query.memberStatus.findFirst({where: eq(memberStatus.id, status.id)});
         if(existing) {
             continue;
         }

         await db.insert(memberStatus).values(status);
    }
}