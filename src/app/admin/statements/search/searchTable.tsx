'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"

export function SearchTable({ statements }) {

    const filters = [
 
    ]
    return (

        <DataTable columns={columns} data={statements} filters={filters} />

    )
}