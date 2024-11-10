'use clientt'

import DataTable from "@/components/msc/dataTable/data-table"
import { columns } from "./columns"
import React from "react"

export function SearchTable({ members, status, memberTypes, personTypes }) {

    return (

        <DataTable columns={columns} data={members} status={status} memberTypes={memberTypes} personTypes={personTypes} />

    )
}