'use client';
import React, { FormEvent, useState } from 'react';
import { useStripe, useElements, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { PaymentIntent, StripeElements, StripeError } from '@stripe/stripe-js';

interface CheckoutFormProps {
    checkoutComplete: (PaymentIntent: PaymentIntent | undefined) => Promise<void>;
}


export default function CheckoutForm({ checkoutComplete }: CheckoutFormProps) {

    const stripe = useStripe();
    const elements: StripeElements | null = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleError = (error: StripeError) => {
        setLoading(false);
        setErrorMessage(error.message || 'An unknown error occurred');
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://maywoodsc.org/member',
            },
            redirect: 'if_required',
        });

        if (error) {
            handleError(error);
        } else {
            checkoutComplete(paymentIntent);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement className='py-4' />
            <Button variant={'default'} type="submit" disabled={!stripe || loading} className='w-full bg-green-300'>
                Submit Payment
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>

    );
}

