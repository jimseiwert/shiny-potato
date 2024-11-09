"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

export const MemberSearchContext = createContext({
    handleStatusChange: (status: any) => {},
    handleFilterChange: () => {},
    setCurrentPage: (page: number) => {},
    setItems: (items: any[]) => {},
    setName: (name: string) => {},
    setEmail: (email: string) => {},
    setPhone: (phone: string) => {},
    setMemberType: (memberType: any) => {},
    setPersonType: (personType: any) => {},
    loadItems: (items: any[]) => {},
    getData: () => {},
    name: '',
    email: '',
    phone: '',
    memberType:{ id: 1, name: 'Full' },
    personType: { id: 'all', name: 'All' },
    status: { id: 'all', name: 'All' },
    items: [],

})

export default function MemberSearchProvider({ children }: { children: React.ReactNode }) {
    const [name, setName] = useState<string>('');
    const [memberType, setMemberType] = useState({ id: 1, name: 'Full' });
    const [status, setStatus] = useState({ id: 1, name: 'Paid' });
    const [personType, setPersonType] = useState({ id: 1, name: 'Member' });
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const url = `${'http://localhost:3000/api/members'}?name=${encodeURIComponent(name)}&memberType=${encodeURIComponent(memberType.id)}&status=${encodeURIComponent(status.id)}&personType=${encodeURIComponent(personType.id)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&page=${currentPage}&perPage=${itemsPerPage}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setItems(data);
        }
        fetchData();
      }, [name, memberType, status, personType, email, phone, currentPage, itemsPerPage]);
      
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
        name, setName, email, setEmail, phone, setPhone, memberType, setMemberType, personType, setPersonType, setItems, status, setStatus, items
    };

    return (
        <MemberSearchContext.Provider value={contextValue}>
            {children}
        </MemberSearchContext.Provider>
    )
}