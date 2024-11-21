import { InertPaymentRecord } from "@/server/db/queries/payment/records";
import { AddPendingTask } from "@/server/db/queries/statement/tasks";
import { PaymentIntentRequest } from "@/server/interfaces/payments/paymentIntent";
import { StatementCheckoutRequest } from "@/server/interfaces/payments/statementCheckout";
import { PaymentIntent } from "@stripe/stripe-js";



export async function CheckOut(data: StatementCheckoutRequest): Promise<PaymentIntentRequest >{

    const description = "2025 Dues Statement";
    const statement_descriptor = "2025 Dues Statement";
    const metadata = { statement: 22 }

    let amount = 450;
    amount += data.dinners ? 300 : 0
    amount += data.bulletin ? 45 : 0
    amount += data.guestFishingBook ? 100 : 0
    amount += data.extraKeyCard ? 10 : 0
    amount += data.extraWindowsSticker ? 10 : 0
    amount += Number(data.archeryContribution < 0 ? 0 : data.archeryContribution)
    amount += Number(data.campingContribution < 0 ? 0 : data.campingContribution)
    amount += Number(data.fishingContribution < 0 ? 0 : data.fishingContribution)
    amount += Number(data.pistolContribution < 0 ? 0 : data.pistolContribution)
    amount += Number(data.womansContribution < 0 ? 0 : data.womansContribution)

      return {
        amount,
        description,
        statement_descriptor,
        metadata,
        receipt_email: "jimseiwert@gmail.com"
      }
}


export async function ProcessPayment(paymentIntent: PaymentIntent, data: StatementCheckoutRequest): Promise<void> {
    await AddPendingTask({
        statementId: data.statementId,
        badge: true,
        familyBadge: data.sendFamilyBadge,
        keycard: data.extraKeyCard ? 1 : 0,
        sticker: data.extraWindowsSticker ? 1 : 0,
        delivery: data.delivery
    })

    await InertPaymentRecord({
        statement: data.statementId,
        method: data.method,
        amount: paymentIntent.amount,
        confirmation: paymentIntent.id
    });

    return
}