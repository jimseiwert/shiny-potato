import { TableProps } from "@/components/dataTable/table";
import { AllMembers } from "@/server/db/queries/member/unique"
import { getRoles } from "@/server/db/queries/board";
import RoleDetail from "./role-detail";
import { AssignedUserRole } from "@/server/interfaces/role";
import { Claim } from "@/server/enums/claims";

async function Board() {
  const members = await AllMembers()
  const roles = await getRoles()

  const tableConfig: TableProps<AssignedUserRole> = {
    mainFilter: {
      show: false,
    },
    data: [],
    columnConfig: 'board',
  }
  
  return (
    <RoleDetail tableConfig={tableConfig} roles={roles} members={members}/>
    
  )
}

export default Board;
