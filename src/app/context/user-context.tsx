'use client';
import { createContext } from "react";

export const UserContext = createContext({

});

export const UserProvider = ({ children }: {children: React.ReactNode}) => {
   

    return (
        <UserContext.Provider value={{}}>
        {children}
        </UserContext.Provider>
    )
}