"use client"


import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { Role } from "@/server/db/interfaces/role"
import { AssignedPermission, Permission } from "@/server/db/interfaces/permission"

interface props {
  role: Role | null,
  dateChanged: Date
}
export default function AssignedPermissions({ role, dateChanged }: props) {
  const [assignedPermissions, setAssignedPermissions] = useState<AssignedPermission[]>([])

  useEffect(() => {
    async function loadData() {
      if(role) {
        await getPermissionAssignments(role)
      }
    }
    loadData()
  }, [role, dateChanged]);
  
  const getPermissionAssignments = async (role: Role) => {
    toast("Getting assignnments for " + role.name)
    const response = await fetch(`/api/board/permission?role=${role.id}`)
    if (response.ok) {
      const data = await response.json()
      setAssignedPermissions( data )
      toast("Assignment loaded for " + role.name)
    }
    else {
      console.error("Failed to fetch data")
    }
  }

  const deleteAssignedPermission = async (permission: AssignedPermission) => {
    toast("Deleting assigned permission " + permission.name)
    const response = await fetch(`/api/board/permission`, {method: 'DELETE', body: JSON.stringify({ id: permission.id })})
    if (response.ok) {
      setAssignedPermissions((previousState) => previousState.filter((perm: Permission) => perm.id != permission.id))
      toast("Assignment loaded for " + role!.name)
    }
    else {
      console.error("Failed to fetch data")
    }
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {assignedPermissions.map((perm) => (
          <li key={perm.id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold">{perm.name}</p>
              </div>
            </div>
            <Button variant="destructive" className="rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset" onClick={() => deleteAssignedPermission(perm)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
    
    
  )
}
