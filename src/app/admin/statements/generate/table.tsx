'use client';
import { Table, TableProps } from "@/components/msc/dataTable/table";
import { useContext } from "react";
import { GenerateStatementContext } from "./context";
import { GenerateStatementSearchType } from "@/server/db/queries/statement";

export default function DataTable() {
    const { data } = useContext(GenerateStatementContext);
    const tableConfig: TableProps<GenerateStatementSearchType> = {
        mainFilter: {
          show: true,
          title: 'Search Memebrs',
          column: 'member'
        },
        data: data,
        columnConfig: 'statementGenerate',
      }

    return (
        <Table config={tableConfig} ></Table>
    )
}