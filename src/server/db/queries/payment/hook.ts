import { db } from "../..";
import { paymentHooks } from "../../schemas";

export async function InsertPaymentHook(type: string, content: string) {
    await db.insert(paymentHooks).values({
        type: type,
        content:content
    });
}