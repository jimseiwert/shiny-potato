import "server-only";
import { db } from "../..";
import { payments } from "../../schemas";

export async function UpdatePayment(StatementId?: number,dinner?:number, method: "credit" | "check" | "cash", 
     amount: number, confirmation: string) {
    await db.insert(payments).values({
        statement: StatementId,
        dinner: dinner,
        amount: amount,
        fee: 0,
        method: method,
        batch: 'Manual',
        confirmation: confirmation,
    });
       
}