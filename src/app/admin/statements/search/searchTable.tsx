'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"
import { title } from "process"

export function SearchTable({ statements }) {
    const mainFilter = {
        title: "Search Member....",
        column: "member"
    }
    const filters = [
 
    ]
    return (

        <DataTable columns={columns} data={statements} filters={filters} mainFilter={mainFilter} />

    )
}