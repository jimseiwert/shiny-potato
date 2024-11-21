import { db } from "../..";
import { payments } from "../../schemas";



interface PaymentProps {
    statement?: number;
    dinner?: number;
    method: "credit" | "check" | "cash";
    amount: number;
    confirmation: string;
}

export async function InertPaymentRecord(props: PaymentProps) {
    await db.insert(payments).values({
        statement: props.statement,
        dinner: props.dinner,
        amount: props.amount,
        fee: 0,
        method: props.method,
        batch: 'Manual',
        confirmation: props.confirmation
    });
}