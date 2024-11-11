'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"

export function SearchTable({ statements }) {
    const mainFilter = {
        title: "Search Dinners....",
        column: "name"
    }
    const filters = [
 
    ]
    return (

        <DataTable columns={columns} data={statements} filters={filters} mainFilter={mainFilter}/>

    )
}