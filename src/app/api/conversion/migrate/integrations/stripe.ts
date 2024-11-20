import { DeleteCustomer, GetCustomers, GetPaymentMethods, GetPayments, GetSubscriptions } from "@/lib/stripe";

export async function Stripe() {
    const customers = await GetCustomers();

    const list = customers.map((customer) => {
        return {
            id: customer.id,
            name: `${customer.name}`,
            email: customer.email,
        }
    });

let count = 0;
    const shouldPurge = [];
    for (const customer of list) {
        const paymentIntents = await GetPayments(customer.id);

        if (paymentIntents.length === 0) {
            const paymentMethods = await GetPaymentMethods(customer.id);
            const subscriptions = await GetSubscriptions(customer.id);

            if (paymentMethods.length === 0 && subscriptions.length === 0) {
                shouldPurge.push(customer.id);
                await DeleteCustomer(customer.id);
                console.log(`Customer ${customer.id} has no payment methods or subscriptions`);
            }
        }

        count++;
        console.log(`Processed ${count} out of ${list.length} customers`);
    }

    console.log('would purge', shouldPurge.length)
    // for (const customer of shouldPurge) {
    //     await DeleteCustomer(customer);
    //     console.log(`Customer ${customer} has been deleted`);
    // }
    // console.log(list)
}