"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableFilterConfig } from "./filters"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  filters?: DataTableFilterConfig[],
  mainFilter?: DataTableFilterConfig
}

export function DataTableToolbar<TData>({
  table,
  filters,
  mainFilter
}: DataTableToolbarProps<TData>,) {
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {mainFilter && mainFilter.show && (
        <Input
          placeholder={mainFilter.title}
          value={(table.getColumn(mainFilter.column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(mainFilter.column)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />)}

        {filters && filters.map((filter) => (
               <DataTableFacetedFilter key={filter.column}
               column={table.getColumn(filter.column)}
               title={filter.title}
               options={filter.options!}
             />
        ))}
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