'use client'

import DataTable from "@/components/msc/dataTable/data-table"
import React, { useEffect, useState } from "react"
import { DataTableFilterConfig } from "@/components/msc/dataTable/filters"
import { ColumnDef } from "@tanstack/react-table"

export interface TableProps {
    mainFilter: {
        show: boolean,
        title: string,
        column: string
    }
    data:unknown[],  
    columns: ColumnDef<unknown>[],
    filters: DataTableFilterConfig[] ,
}

export function Table({ data, columns }: TableProps) {
    const [tableData, setTableData] = useState<unknown[]>([])

    useEffect(() => {
        setTableData(data)
    }, [data]);

    return (

        <DataTable columns={columns} data={tableData} filters={data.filters} mainFilter={mainFilter} />

    )
}