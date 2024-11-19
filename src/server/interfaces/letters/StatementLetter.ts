import { line } from "drizzle-orm/pg-core";
import { Address } from "../member";

export interface StatementLetter {
    year: number
    address: Address
    description: string
    member: {
        id: number,
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        cellPhone: string | null;
        homePhone: string | null;
    },
    spouse: {
        name: string | null | undefined;
        email: string | null | undefined;
    },
    lines: {
        item: string;
        cost: string;
        selected: boolean;
    }[],
    donations: string[]
}

export class StatementPrintData {
    statement: StatementLetter;

    constructor(statement: StatementLetter) {
        this.statement = statement;
    }

    getData() {
        let obj = {
            memberId: this.statement.memberId,
            year: this.statement.year,
            description: this.statement.description,
            donations: this.statement.donations.map((donation) => { return [donation, ""] })
        };

        let total = 0;
        //loop through lines by index
        for (let i = 0; i < this.statement.lines.length; i++) {
            if (this.statement.lines[i].selected) {
                total += parseFloat(this.statement.lines[i].cost.replace('$', ''));
            }

            obj[`option${i +1}item`] = this.statement.lines[i].item;
            obj[`option${i+1}cost`] = this.statement.lines[i].cost;
            obj[`option${i+1}selected`] = this.statement.lines[i].selected ? "X" : "";
        }

        obj.total = total;

        if (this.statement.member) {
            obj.memberId = this.statement.member.id;
            obj.firstName = this.statement.member.firstName;
            obj.lastName = this.statement.member.lastName;
            obj.email = this.statement.member.email;
            obj.cellPhone =this.statement.member.cellPhone;
            obj.homePhone = this.statement.member.homePhone;
        }

        if (this.statement.address) {
            obj.addressLine1 = this.statement.address.line1;
            obj.addressLine2 = this.statement.address.line2;
            obj.addressCity = this.statement.address.city;
            obj.addressState = this.statement.address.state;
            obj.addressZip = this.statement.address.zip;
        }

        if (this.statement.spouse) {
            obj.spouseName = this.statement.spouse.name || '';
            obj.spouseEmail = this.statement.spouse.email || '';
        }

        return obj;


    }
}