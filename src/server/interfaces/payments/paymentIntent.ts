import { MetadataParam } from "@stripe/stripe-js";

export interface PaymentIntentRequest {
    amount: number;
    statement_descriptor: string;
    description: string;
    receipt_email: string;
    metadata: MetadataParam;
}

