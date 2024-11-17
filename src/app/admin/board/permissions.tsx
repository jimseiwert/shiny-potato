"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Permission } from '@/server/interfaces/permission'
import { Role } from '@/server/interfaces/role'
import { toast } from "sonner"
import AssignedPermissions from './assigned-permissions'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface props {
  role: Role | null
  permissions: Permission[]
}
export default function Permissions({ role, permissions }: props) {
  const [permission, setPermission] = useState<Permission | null>(null)
  const [dateChanged, setDateChanged] = useState(new Date())

  const addPermission = async () => {
    if (role && permission) {
      toast(`Adding ${permission.name} to ${role.name}`)
      const response = await fetch(`/api/board/permission`, {
        method: 'POST',
        body: JSON.stringify({ permission: permission.id, role: role.id })
      })
      if (response.ok) {
        toast("Permission added for " + role.name)
        setPermission(null)
        setDateChanged(new Date())
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
    <div className='py-2'>

    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>What can this role do on the website</CardDescription>
      </CardHeader>
      <CardContent>
        <AssignedPermissions role={role} dateChanged={dateChanged} />
        
      </CardContent>
      <CardFooter>
      <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2 gap-2 w-full">
      <div className="col-span-2"><Select value={permission?.id + ''}  onValueChange={(p: string) =>{
            const perm = permissions.find(perm => perm.id === Number(p))
            if(perm){
              setPermission(perm);
            }
          }} >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                {permissions.map((permission) => (
                    <SelectItem key={permission.id} value={permission.id + ''}>{permission.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select></div>
      <div><Button disabled={!permission} onClick={() => setPermission(null)} variant="outline">Reset</Button></div>
      <div className='text-end'><Button disabled={!permission || !role} onClick={addPermission}>Assign</Button></div>
    </div>
       
      </CardFooter>
    </Card>
    </div>
  )
}
