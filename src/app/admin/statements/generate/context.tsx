'use client';

import { GenerateStatementSearchType } from "@/server/db/queries/statement";
import { MemberStatus, MemberType } from "@/server/interfaces/member";
import { Template } from "@/server/interfaces/template";
import { createContext, useEffect, useState } from "react";

interface GenerateStatementContext {
    data: GenerateStatementSearchType[];
    memberTypes: MemberType[];
    memberStatus: MemberStatus[];
    letterTemplates: Template[];
    search: (data: any) => void;
}

type Props = {
    children: React.ReactNode
}

export const GenerateStatementContext = createContext<GenerateStatementContext>({
    data: [],
    search: () => { },
    memberTypes: [],
    memberStatus: [],
    letterTemplates: []
});

export const GenerateStatementProvider = ({ children }: Props) => {
    const [memberTypes, setMemberTypes] = useState<MemberType[]>([]);
    const [memberStatus, setMemberStatus] = useState<MemberStatus[]>([]);
    const [letterTemplates, setLetterTemplates] = useState<Template[]>([]);
    const [data, setData] = useState<GenerateStatementSearchType[]>([]);

    const loadInitialData = async() => {
        const _memebrTypes = await fetch('/api/member/types')
        setMemberTypes(await _memebrTypes.json())

        const _memberStatus = await fetch('/api/member/status')
        setMemberStatus(await _memberStatus.json())

        const _letters = await fetch('/api/template')
        setLetterTemplates(await _letters.json())
    }

    useEffect(() => {
        loadInitialData();
    },[]);

    const search = async (searchForm: any) => {
          const response = await fetch('/api/statement/generate', {
              method: 'POST',
              body: JSON.stringify(searchForm),
          });
            const results = await response.json();
        setData(results);
    }


    return (
        <GenerateStatementContext.Provider value={{ data , memberTypes, letterTemplates, memberStatus, search}}>
           {children}
        </GenerateStatementContext.Provider>
    )
}