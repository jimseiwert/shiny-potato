'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"
import { DataTableFilterConfig } from "@/components/msc/dataTable/filters"
import { Applications } from "./applications"

export function SearchTable({ applications }: { applications: Applications[] }) {
    const mainFilter = {
        title: "Search Applicants....",
        column: "member"
    }
    const filters: DataTableFilterConfig[] = [
 
    ]
    return (

        <DataTable columns={columns} data={applications} filters={filters} mainFilter={mainFilter} />

    )
}