"use client"
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Role } from '@/server/db/interfaces/role'
import { Dispatch, SetStateAction } from 'react'

interface Props {
    roles: Role[],
    selectedRole: Role | null,
    setSelectedRole: Dispatch<SetStateAction<Role | null>>
}
export default function Roles({ roles, selectedRole, setSelectedRole }: Props) {
    return (
        <div className='py-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Select Role</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select value={selectedRole?.id + ''} onValueChange={(r: string) => {
                        const role = roles.find(p => p.id === Number(r))
                        if (role) {
                            setSelectedRole(role);
                        }
                    }}>
                        <SelectTrigger id="framework">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {roles.map((role) => (
                                <SelectItem key={role.id} value={role.id + ''}>{role.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </CardContent>
            </Card>
        </div>
    )
}
