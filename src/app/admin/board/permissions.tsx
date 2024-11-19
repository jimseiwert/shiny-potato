"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Permission } from '@/server/interfaces/permission'
import { Role } from '@/server/interfaces/role'
import { toast } from "sonner"
import AssignedPermissions from './assigned-permissions'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { set } from 'zod'

interface props {
  role: Role | null
}
export default function Permissions({ role }: props) {
  const [groups, setGroups] = useState<Permission[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])

  const changePermission = async (permission: Permission) => {
    setPermissions(permissions.map(p => {
      if (p.id === permission.id) {
        return { ...p, assigned: !p.assigned }
      }
      return p
    }));

    if (permission.assigned) {
      deleteAssignedPermission(permission)
    }else{
      addPermission(permission)
    }

  }
  useEffect(() => {
    async function loadAssigned() {
      if (role) {
        toast(`Loading assigned members to ${role.name}`)
        const response = await fetch(`/api/board/permission?role=${role.id}`)
        if (response.ok) {
          const data = await response.json()
          const groups = [...(new Set(data.map(p => p.group)))]
          setGroups(groups)
          setPermissions(data)
          toast(`${role.name} assignments loaded`);
        }
        else {
          console.error("Failed to fetch data")
        }
      }
    }
    loadAssigned()

  }, [role]);

  const deleteAssignedPermission = async (permission: Permission) => {
    toast("Deleting assigned permission " + permission.name)
    const response = await fetch(`/api/board/permission`, {method: 'DELETE', body: JSON.stringify({ id: permission?.assigned })})
    if (response.ok) {
      toast("Permission removed for " + role!.name)
    }
    else {
      toast.error("Failed to remove permission")
    }
  }

  const addPermission = async (permission: Permission) => {
    if (role && permission) {
      toast(`Adding ${permission.name} to ${role.name}`)
      const response = await fetch(`/api/board/permission`, {
        method: 'POST',
        body: JSON.stringify({ permission: permission.id, role: role.id })
      })
      if (response.ok) {
        const result = await response.json()
        toast("Permission added for " + role.name)
        setPermissions(permissions.map(p => {
          if (p.id === permission.id) {
            return { ...p, assigned: result.id }
          }
          return p
        }));
      }
      else {
        toast.error(`Assigning ${permission.name} to ${role.name} failed: ${response.statusText}`);
      }
    }
    else {
      toast.error("Please select role and permission first")
    }
  }

  return (
    <div className='pt-10'>
      <h2 className="text-base/7 font-semibold border-b-2 py-4">Permissions</h2>

      <div className='py-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {groups.map((group) => (
          <Card key={group}>
            <CardHeader>
              <CardTitle>{group}</CardTitle>
            </CardHeader>
            <CardContent>
              {permissions.filter(p => p.group === group).map((permission) => (
                <div className="flex items-center space-x-2 gap-2 py-2" key={permission.id}>
                  <Switch id="airplane-mode" checked={permission.assigned ? true: false} onCheckedChange={(p) => {changePermission(permission)}} />
                  <Label htmlFor="airplane-mode">{permission.name}</Label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
