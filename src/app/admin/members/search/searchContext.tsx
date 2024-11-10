'use client';
import React from "react";
import { createContext } from "react";

export const SearchContext = createContext({

});

export const SearchProvider = ({ children }: {children: React.ReactNode}) => {
   const [status, setStatus] = React.useState<{ label: string; value: string }[]>([])

    return (
        <SearchContext.Provider value={{status, setStatus}}>
        {children}
        </SearchContext.Provider>
    )
}