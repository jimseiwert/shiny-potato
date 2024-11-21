import React, { FormEvent, FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, PaymentIntent, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from './PaymentForm';
import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { ProcessPaymentRequest } from '@/server/interfaces/payments/process';
import { PaymentTypes } from '@/server/interfaces/payments/paymentTypes';
import { StatementCheckoutRequest } from '@/server/interfaces/payments/statementCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentButtonProps     {
    children: React.ReactNode;
    data: StatementCheckoutRequest;
    type: PaymentTypes;
    onSubmit: () => void;
    trigger: () => Promise<boolean>;
}

const PaymentButton = ({ onSubmit, children, data, type, trigger }: PaymentButtonProps) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<StripeElementsOptions | undefined>(undefined);

    const getPaymentIntent = async () => {
        const res = await fetch("/api/stripe/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({type, data}),
        });

        const response: StripeElementsOptions = await res.json();
        setOptions(response);
        setOpen(true);
    };

    const checkoutComplete = async (paymentIntent: PaymentIntent | undefined) => {
        const obj: ProcessPaymentRequest = {
            type: type,
            paymentIntent: paymentIntent,
            data: data,
        };
        await fetch("/api/stripe/checkout", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });

        setOpen(false);
        onSubmit();
    }

    const handleClick = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const submit = async () => {
            const isValid = await trigger();
            if (!isValid) {

                return;
            }

            try {
                await getPaymentIntent();
                setOpen(true);


            } catch (error) {
                console.error('Payment failed:', error);
            } 
        }
        submit();
    };

    return (
        <React.Fragment>
            <Button
                type="submit"
                onClick={handleClick}
                disabled={open}
                className='w-full bg-green-300'
            >
                {open ? <Loader2 className="animate-spin" /> : children}
            </Button>

            {open && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Payment</DialogTitle>
                            <DialogDescription>
                                Please review the total amount and click pay when ready.
                            </DialogDescription>
                        </DialogHeader>
                        <Elements stripe={stripePromise} options={options} >
                            <CheckoutForm checkoutComplete={checkoutComplete} />
                        </Elements>
                    </DialogContent>
                </Dialog>
            )}
        </React.Fragment>
    );
};

export default PaymentButton;
