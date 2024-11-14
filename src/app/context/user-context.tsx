'use client';
import { Claim } from "@/server/enums/claims";
import { createContext } from "react";

export const UserContext = createContext({

});

export const UserProvider = ({ claims, children }: {claims: Claim[], children: React.ReactNode}) => {
    const userHasClaim = (claim: Claim) => {
        console.log(claims.includes(claim));
        return true;
    }

    return (
        <UserContext.Provider value={{userHasClaim}}>
        {children}
        </UserContext.Provider>
    )
}