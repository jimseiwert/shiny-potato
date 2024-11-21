import { PaymentIntentRequest } from "@/server/interfaces/payments/paymentIntent";
import { StripeElementsOptions } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2024-10-28.acacia",
});

export const CreatePaymentIntent = async (props: PaymentIntentRequest
): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(props.amount) * 100,
        currency: "USD",
        metadata: props.metadata,
        statement_descriptor: props.statement_descriptor,
        description: props.description,
        receipt_email: props.receipt_email,
        automatic_payment_methods: { enabled: true },
    });

    return paymentIntent
}


export const GetCustomers = async () => {
    try {

        let hasMore = true;
        const customersList = [];

        do {
            let searchObj = { limit: 100 };

            if (customersList.length > 0) {
                searchObj.starting_after = customersList[customersList.length - 1].id;
            }

            const customers = await stripe.customers.list(searchObj);
            customersList.push(...customers.data);
            hasMore = customers.has_more;
        } while (hasMore)

        return customersList;
    } catch (error) {
        console.log(error)
    }
}


export const GetPaymentMethods = async (customerId: string) => {
    try {
        const paymentMethods = await stripe.customers.listPaymentMethods(
            customerId
        );
        console.log(paymentMethods)
        return paymentMethods.data;
    } catch (error) {
        console.log(error)
    }
}

export const GetSubscriptions = async (customerId: string) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId
        });

        return subscriptions.data;
    } catch (error) {
        console.log(error)
    }
}

export const GetPayments = async (customerId: string) => {
    try {
        const subscriptions = await stripe.paymentIntents.list({
            customer: customerId
        });

        return subscriptions.data;
    } catch (error) {
        console.log(error)
    }
}

export const DeleteCustomer = async (customerId: string) => {
    try {
        const deleteConfirmation = await stripe.customers.del(customerId);
        console.log(deleteConfirmation)
        return;
    } catch (error) {
        console.log(error)
    }
}
