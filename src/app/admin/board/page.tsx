import { TableProps } from "@/components/msc/dataTable/table";
import { AllMembers } from "@/server/db/queries/member/unique"
import { getRoles } from "@/server/db/queries/board";
import ClientBoard from "./client-page";

export default async function Board() {
  const members = await AllMembers()
  const roles = await getRoles()
  const tableConfig: TableProps = {
    mainFilter: {
      show: false,
    },
    data: [],
    columnConfig: 'board',
  }
  
  return (
    <ClientBoard tableConfig={tableConfig} roles={roles} members={members}/>
    
  )
}
