"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  status: { label: string; value: string }[]
  memberTypes: { label: string; value: string }[]
  personTypes: { label: string; value: string }[]
}

export function DataTableToolbar<TData>({
  table,
  status,
  memberTypes,
  personTypes
}: DataTableToolbarProps<TData>,) {
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("member")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("member")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
           
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status}
          />
        )}
        {table.getColumn("memberType") && (
          <DataTableFacetedFilter
            column={table.getColumn("memberType")}
            title="Member Type"
            options={memberTypes}
          />
        )}
        {table.getColumn("personType") && (
          <DataTableFacetedFilter
            column={table.getColumn("personType")}
            title="Person Type"
            options={personTypes}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  )
}