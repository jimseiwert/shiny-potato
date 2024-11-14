import { TableProps } from "@/components/msc/dataTable/table";
import { AllMembers } from "@/server/db/queries/member/unique"
import { getRoles } from "@/server/db/queries/board";
import RoleDetail from "./role-detail";
import { getPermissions } from "@/server/db/queries/permission";
import { AssignedUserRole } from "@/server/db/interfaces/role";
import withAuth from "@/lib/withAuth/serverPage";
import { Claim } from "@/server/enums/claims";

async function Board() {
  const members = await AllMembers()
  const roles = await getRoles()
  const permissions = await getPermissions();

  const tableConfig: TableProps<AssignedUserRole> = {
    mainFilter: {
      show: false,
    },
    data: [],
    columnConfig: 'board',
  }
  
  return (
    <RoleDetail tableConfig={tableConfig} roles={roles} members={members} permissions={permissions}/>
    
  )
}


export default withAuth(Board, Claim.BoardRead)