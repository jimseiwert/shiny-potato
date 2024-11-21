import { db } from "../..";
import { paymentHooks } from "../../schemas";

export async function InsertPaymentHook(type: string, paymentIntent: string, content: string) {
    await db.insert(paymentHooks).values({
        type: type,
        payment_intent_id: paymentIntent,
        content:content
    });
}
