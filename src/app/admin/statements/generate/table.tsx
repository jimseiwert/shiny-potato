'use client';
import { Table, TableProps } from "@/components/dataTable/table";
import { useContext, useEffect, useState } from "react";
import { GenerateStatementContext } from "./context";
import { GenerateStatementSearchType } from "@/server/db/queries/statement";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DataTable() {
    const { data } = useContext(GenerateStatementContext);
    const [tableConfig, setTableConfig] = useState<TableProps<GenerateStatementSearchType> | null>(null);
    
    const preview = async (): Promise<void> => {
      toast(`Getting Preview`);
     
      const response = await fetch(`/api/statement/generate`, {
          method: 'PATCH',
          body: JSON.stringify({members: data.filter(r => !r.exclude).map(r => {return r.memberId}), year: new Date().getFullYear() + 1, letter: 1}),
      })
      if (response.ok) {
          const pdf = await response.arrayBuffer();
          const blob = new Blob([pdf], { type: 'application/pdf' });
          window.open(URL.createObjectURL(blob));
      } else {
          toast.error('Failed to preview statement');
          return;
      }
  }

    useEffect(() => {
      const tableConfig: TableProps<GenerateStatementSearchType> = {
        mainFilter: {
          show: true,
          title: 'Search Memebrs',
          column: 'member'
        },
        data: data,
        columnConfig: 'statementGenerate',
      }

      setTableConfig(tableConfig);
    },[data]);
    

    return (
      <>
      <div className="grid justify-items-end">
        <Button onClick={preview}>Preview All Statements</Button>
        </div>
        {tableConfig && <Table config={tableConfig} ></Table>}
        </>
    )
}