import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { InsertPaymentHook } from '@/server/db/queries/payment/hook';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!
export async function POST(req: Request): Promise<NextResponse> {
    const body = await req.text();
    const headers = await req.headers;
    console.log(headers);
    const sig = req.headers.get('stripe-signature')
    let event;


    try {
        console.log(sig, webhookSecret)
        if (!sig || !webhookSecret)  return NextResponse.json({ error: true, msg: 'Signatures don\'t match' }, { status: 400 });;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error('Error verifying webhook signature:', err);
        return NextResponse.json({ error: true, msg: err.message }, { status: 400 });
    }

    switch (event.type) {
        case 'checkout.session.completed':
        case 'charge.succeeded':
        case 'invoice.payment_succeeded':
            await InsertPaymentHook(event.type, event.data.object.id, JSON.stringify(event));
            break;
        default:
            await InsertPaymentHook(event.type, "Unknown", JSON.stringify(event));
    }

    
    

    return NextResponse.json({ received: true }, { status: 200 });
}








