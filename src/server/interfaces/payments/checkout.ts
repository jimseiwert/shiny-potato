import { PaymentTypes } from "./paymentTypes";
import { StatementCheckoutRequest } from "./statementCheckout";

export interface CheckoutRequest {
    type: PaymentTypes;
    data: StatementCheckoutRequest
}