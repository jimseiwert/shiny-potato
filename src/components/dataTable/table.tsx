'use client'
import DataTable from "@/components/dataTable/data-table"
import React, { useEffect, useMemo, useState } from "react"
import { DataTableFilterConfig } from "@/components/dataTable/filters"
import { Columns } from "./columns"

export interface TableProps<TData> {
    mainFilter?: {
        show?: boolean,
        title?: string,
        column?: string
    }
    data:TData[],  
    columnConfig: string,
    filters?: DataTableFilterConfig[] ,
    redirectOnClick?: {
        link: string,
        replaceParams: { token: string, column: string }[]  
    }  
}

export function Table<TData>({ config }: {config: TableProps<TData>}) {
    const [tableData, setTableData] = useState<TData[]>([])

    useEffect(() => {
        setTableData(config.data)
    }, [config.data]);

    const columns = useMemo(()=> Columns(config.columnConfig,tableData, setTableData), [config.columnConfig, tableData, setTableData])

    return (

        <DataTable columns={columns} data={tableData} filters={config.filters} mainFilter={config.mainFilter} redirectOnClick={config.redirectOnClick}/>

    )
}
