import { CreatePaymentIntent } from "@/lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { CheckOut, ProcessPayment } from "./statement";
import { CheckoutRequest } from "@/server/interfaces/payments/checkout";
import { ProcessPaymentRequest } from "@/server/interfaces/payments/process";
import { handleError } from "@/lib/errorHandler";
import { StripeElementsOptions } from "@stripe/stripe-js";

export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { type, paymentIntent, data }: ProcessPaymentRequest = await req.json();

    switch (type) {
      case "statement":
        await ProcessPayment(paymentIntent, data);
        break;
      default:
        throw new Error("Invalid type");
    }

    return NextResponse.json({ accepted: true }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { type, data }: CheckoutRequest = await req.json();
console.log(data);
    let checkoutObject;

    switch (type) {
      case "statement":
        checkoutObject = await CheckOut(data);
        break;
      default:
        throw new Error("Invalid type");
    }


    const paymentIntent = await CreatePaymentIntent(checkoutObject);
    const response: StripeElementsOptions = { clientSecret: paymentIntent.client_secret || "" };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}