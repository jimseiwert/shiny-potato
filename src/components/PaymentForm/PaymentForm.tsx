"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cardElement = elements?.getElement("card");
        try {
            if (!stripe || !cardElement) return null;
        } catch (error) {
            console.log(error);
        }

        const { data } = await fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({ amount: 89 }),
        })
        const clientSecret = data;

        await stripe?.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
          });
    }

    return (
        <form onSubmit={onSubmit}>
          <CardElement />
          <button type="submit">Submit</button>
        </form>
      );
}