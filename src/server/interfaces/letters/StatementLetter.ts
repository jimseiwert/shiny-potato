import { year } from "drizzle-orm/mysql-core";

export interface StatementLetter {
    year: number
    description: string
    firstName: string;
    lastName: string;
    email: string;
    cellPhone: string;
    homePhone: string;
    spouseName: string;
    spouseEmail: string;
    option1: {
        item: string;
        cost: string;
        selected: boolean;
    },
    option2: {
        item: string;
        cost: string;
        selected: boolean;
    },
    option3: {
        item: string;
        cost: string;
        selected: boolean;
    },
    option4: {
        item: string;
        cost: string;
        selected: boolean;
    }
    option5: {
        item: string;
        cost: string;
        selected: boolean;
    },
    option6: {
        item: string;
        cost: string;
        selected: boolean;
    },
    donations: string[]
}

export class StatementPrintData {
    statement: StatementLetter;

    constructor(statement: StatementLetter) {
        this.statement = statement;
    }

    getData() {
        return { 
            year: this.statement.year, 
            description: this.statement.description,
            firstName: this.statement.firstName, 
            lastName: this.statement.lastName,
            email: this.statement.email,
            cellPhone: this.statement.cellPhone,
            homePhone: this.statement.homePhone,
            spouseName: this.statement.spouseName,
            spouseEmail: this.statement.spouseEmail,
            option1item: this.statement.option1.item,
            option1cost: this.statement.option1.cost,
            option1selected: this.statement.option1.selected ? "X" : "",
            option2item: this.statement.option2.item,
            option2cost: this.statement.option2.cost,
            option2selected: this.statement.option2.selected ? "X" : "",
            option3item: this.statement.option3.item,
            option3cost: this.statement.option3.cost,
            option3selected: this.statement.option3.selected ? "X" : "",
            option4item: this.statement.option4.item,
            option4cost: this.statement.option4.cost,
            option4selected: this.statement.option4.selected ? "X" : "",
            option5item: this.statement.option5.item,
            option5cost: this.statement.option5.cost,
            option5selected: this.statement.option5.selected ? "X" : "",
            option6item: this.statement.option6.item,
            option6cost: this.statement.option6.cost,
            option6selected: this.statement.option6.selected ? "X" : "",
            donations: this.statement.donations.map((donation) => {return [donation,""]})
        };
        

    }
}