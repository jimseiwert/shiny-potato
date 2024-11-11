'use client'

import DataTable from "@/components/msc/dataTable/data-table"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { getBulletinColumns } from "./columns"
import { Bulletin } from "./bulletin"
import { DataTableFilterConfig } from "@/components/msc/dataTable/filters"
import { deleteBulletin, editBulletin, publishBulletin } from "./actions"

export function Table({ bulletins }: { bulletins: Bulletin[] }) {

    const mainFilter = {
        title: "Search Bulletins....",
        column: "name"
    }
    const filters: DataTableFilterConfig[] = []
    const [data, setData] = useState<Bulletin[]>([])
    
    const onDelete = useCallback(async (bulletin: Bulletin) => {
        if(await deleteBulletin(bulletin.id)) {
            setData(data.filter(b => b.id !== bulletin.id))
        }
    }, [data])

    const onEdit = useCallback(async (bulletin: Bulletin) => {
        if(await editBulletin(bulletin.id, bulletin.month, bulletin.year)) {
            setData(data.map(b => b.id === bulletin.id ? bulletin : b))
        }
        
    }, [data])

    const onPublish = useCallback(async (bulletin: Bulletin) => {
        if(await publishBulletin(bulletin.id)) {
            bulletin.state = 'Publishing';
            setData(data.map(b => b.id === bulletin.id ? bulletin : b))
        }
    }, [data])

    const columns = useMemo(()=> getBulletinColumns({ onDelete, onEdit, onPublish }), [onDelete, onEdit, onPublish])
        
    useEffect(() => {
        setData(bulletins)
    }, [bulletins]);

    return (
        <DataTable columns={columns} data={data} filters={filters} mainFilter={mainFilter} />
    )
}