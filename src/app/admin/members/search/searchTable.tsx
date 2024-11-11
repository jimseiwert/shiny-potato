'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"

export function SearchTable({ members, status, memberTypes, personTypes }) {
    const mainFilter = {
        title: "Search Members....",
        column: "member"
    }
    const filters = [
        { total: "Status", column: "status", options: status },
        { total: "Member Type", column: "memberType", options: memberTypes },
        { total: "Person Type", column: "personType", options: personTypes }
    ]
    return (

        <DataTable columns={columns} data={members} filters={filters} mainFilter={mainFilter}/>

    )
}