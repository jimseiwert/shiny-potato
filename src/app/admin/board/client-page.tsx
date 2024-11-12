'use client';
import { Table, TableProps } from "@/components/msc/dataTable/table";
import Roles from "./roles";
import Members from "./members";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner"

export default function ClientBoard({tableConfig, roles, members}: {tableConfig: TableProps, roles: any[], members: any[]}) {
  const [role, setRole] = useState(roles[0])
  const [member, setMember] = useState(members[0])
  const [config, setConfig] = useState(tableConfig)

  const assign = async () => {
    console.log("Assigning", role, member)
    toast(`Assigning ${member.name} to ${role.name}`)
    const response = await fetch(`/api/board`, {
      method: 'POST',
      body: JSON.stringify({role: role.id, member: member.memberId})
    })
    if (response.ok) {
      await roleChanged(role)
      toast("Assignment loaded for " + role.name)
    }
    else {
      console.error("Failed to fetch data")
    }
  }

  const roleChanged = async (role) => {
    setRole(role)
    toast("Getting assignnments for " + role.name)
    const response = await fetch(`/api/board?role=${role.id}`)
    if (response.ok) {
      const data = await response.json()
      setConfig({...config, data})
      setMember('')
      toast("Assignment loaded for " + role.name)
    }
    else {
      console.error("Failed to fetch data")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-2 px-4 m-auto">
        <div className="w-full"><Roles roles={roles} selectedRole={role} setSelectedRole={roleChanged} /></div>
        <div className="w-full"><Members members={members}  selectedPerson={member} setSelectedPerson={setMember}/></div>
        <div className="w-48">
          
          <Button variant={"default"} onClick={() => assign()}>Assign</Button></div>
      </div>
            <main className="w-full px-4">
        <Table config={config} ></Table>
      </main>
    </div>
  )
}
