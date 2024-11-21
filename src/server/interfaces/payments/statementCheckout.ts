export interface StatementCheckoutRequest {
    statementId: number
    dinners: boolean;
    bulletin: boolean;
    guestFishingBook: boolean;
    extraKeyCard: boolean;
    extraWindowsSticker: boolean;
    archeryContribution: number;
    campingContribution: number;
    fishingContribution: number;
    pistolContribution: number;
    womansContribution: number;
    sendFamilyBadge: boolean;
    delivery: "mail" | "trap";
    method: "credit" | "check" | "cash";
}
