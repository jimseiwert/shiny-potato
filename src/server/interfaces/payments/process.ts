import { PaymentIntent } from "@stripe/stripe-js";
import { StatementCheckoutRequest } from "./statementCheckout";
import { PaymentTypes } from "./paymentTypes";

export interface ProcessPaymentRequest {
    type: PaymentTypes;
    paymentIntent: PaymentIntent | undefined;
    data: StatementCheckoutRequest;
  }