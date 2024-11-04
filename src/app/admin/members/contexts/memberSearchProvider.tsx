"use client";

import { createContext, useState } from "react";

export const MemberSearchContext = createContext({})

export default function MemberSearchProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState<string>('');
    const [memberType, setMemberType] = useState();
    const [status, setStatus] = useState();
    const [personType, setPersonType] = useState();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (perPage: number) => {
        setItemsPerPage(perPage);
    };

    const contextValue = {
        currentPage,
        itemsPerPage,
        handlePageChange,
        handleItemsPerPageChange,
        setCurrentPage,
        name, setName, email, setEmail, phone, setPhone, memberType, setMemberType, personType, setPersonType, status, setStatus
    };

    return (
        <MemberSearchContext.Provider value={contextValue}>
            {children}
        </MemberSearchContext.Provider>
    )
}