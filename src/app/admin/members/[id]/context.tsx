'use client';

import { GenerateStatementSearchType } from "@/server/db/queries/statement";
import { MemberStatus, MemberType } from "@/server/interfaces/member";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { number, z } from "zod"

interface MemberProfileContext {
    memberId: number
}

type Props = {
    children: React.ReactNode,
    memberId: number,
}

export const MemberProfileContext = createContext<MemberProfileContext>({
    memberId: 0,
});

export const MemberProfileProvider = ({ memberId, children }: Props) => {
   
   



    return (
        <MemberProfileContext.Provider value={{ memberId }}>
           {children}
        </MemberProfileContext.Provider>
    )
}