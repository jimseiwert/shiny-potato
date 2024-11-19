'use client';
import { Table, TableProps } from "@/components/msc/dataTable/table";
import Roles from "./roles";
import Members from "./members";
import { useEffect, useState } from "react";
import { toast } from "sonner"
import Permissions from "./permissions";
import { UniqueMember } from "@/server/interfaces/member";
import { AssignedUserRole, Role } from "@/server/interfaces/role";

interface props {
  tableConfig: TableProps<AssignedUserRole>,
  roles: Role[],
  members: UniqueMember[]
}

export default function RoleDetail({ tableConfig, roles, members }: props) {
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
        <div className="flex justify-between items-top gap-4">
          <Roles roles={roles} selectedRole={role} setSelectedRole={setRole} />

          <Members members={members} role={role} setLastUpdated={setLastUpdated}/>
        </div>
        <div>
          <h2 className="text-base/7 font-semibold border-b-2 py-4">Assigned Members</h2>          
          <Table config={config} ></Table>
        </div>
        <Permissions role={role} />    
      </main>
  )
}
