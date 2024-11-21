import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { InsertPaymentHook } from '@/server/db/queries/payment/hook';
import { handleError } from '@/lib/errorHandler';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body = await req.text();
        const sig = req.headers.get('stripe-signature')

        let event;
        let paymentIntentId = '';

        if (!sig || !webhookSecret) throw new Error( 'Signatures don\'t match');

        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        if (!event) throw new Error('Invalid event');

        switch (event.type) {
            case 'payment_intent.payment_failed':
            case 'payment_intent.succeeded':
                paymentIntentId = event.data.object.id;
                break;
            default:
                break;
        }

        await InsertPaymentHook(event.type, paymentIntentId, JSON.stringify(event));
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}








