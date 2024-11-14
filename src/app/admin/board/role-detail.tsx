'use client';
import { Table, TableProps } from "@/components/msc/dataTable/table";
import Roles from "./roles";
import Members from "./members";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import Permissions from "./permissions";
import { UniqueMember } from "@/server/db/interfaces/member";
import { AssignedUserRole, Role } from "@/server/db/interfaces/role";
import { Permission } from "@/server/db/interfaces/permission";

interface props {
  tableConfig: TableProps<AssignedUserRole>,
  roles: Role[],
  members: UniqueMember[],
  permissions: Permission[]
}

export default function RoleDetail({ tableConfig, roles, members, permissions }: props) {
  const [config, setConfig] = useState<TableProps<AssignedUserRole>>(tableConfig)
  const [role, setRole] = useState<Role | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    async function loadAssigned() {
      if(role){
        toast(`Loading assigned members to ${role.name}`)
        const response = await fetch(`/api/board?role=${role.id}`)
        if (response.ok) {
          const data = await response.json()
          setConfig(c => ({...c, data: data}))
          toast(`${role.name} assignments loaded`);
        }
        else {
          console.error("Failed to fetch data")
        }
      }
    }
    loadAssigned()

  }, [role, lastUpdated]);

  return (
      <main className="w-full px-4">
        <div className="flex gap-4">
          <div className="grow h-14">
            <Table config={config} ></Table>
          </div>
          <div className="flex-none w-80 justify-between gap-4">
            <Roles roles={roles} selectedRole={role} setSelectedRole={setRole} />
            <Members members={members} role={role} setLastUpdated={setLastUpdated}/>
            <Permissions role={role} permissions={permissions} />

          </div>
        </div>
      </main>
  )
}
