"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { UniqueMember } from '@/server/interfaces/member'
import { Role } from '@/server/interfaces/role'
import { useState } from 'react'
import { toast } from "sonner"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Claim } from '@/server/enums/claims'
import withProtectedComponent from '@/lib/withAuth/component/client'

interface Props {
  members: UniqueMember[],
  role: Role | null,
  setLastUpdated: React.Dispatch<React.SetStateAction<Date>>
}

const Members = ({ role, members, setLastUpdated }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [selectedMember, setSelectedMember] = useState<UniqueMember | null>(null)

  const assign = async () => {
    if (role && selectedMember) {
      toast(`Assigning ${selectedMember.name} to ${role.name}`)
      const response = await fetch(`/api/board`, {
        method: 'POST',
        body: JSON.stringify({ role: role.id, member: selectedMember.memberId })
      })
      if (response.ok) {
        setSelectedMember(null)
        setLastUpdated(new Date())
        toast(`${selectedMember.name} assigned to ${role.name}`);
      }
      else {
        toast.error(`Assigning ${selectedMember.name} to ${role.name} failed: ${response.statusText}`);
      }
    }
  }

  

  return (
    <div className='py-2 w-full'>
    <Card>
      <CardHeader>
        <CardTitle>Assign Members</CardTitle>
        <CardDescription>Add Member to {role?.name}.</CardDescription>
      </CardHeader>
      <CardContent>
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedMember
            ? members.find((framework) => framework.memberId === selectedMember.memberId)?.name
            : "Select member..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
        filter={(value, search, keywords = []) => {
          const extendValue = value + " " + keywords.join(" ");
          if (extendValue.toLowerCase().includes(search.toLowerCase())) {
            return 1;
          }
          return 0;
        }}
        >
          <CommandInput placeholder="Search members..." />
          <CommandList>
            <CommandEmpty>No members found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.memberId}
                  value={member.memberId + ''}
                  keywords={[member.name]}
                  onSelect={(id: string) => {
                    const foundMember = members.find((framework) => framework.memberId === Number(id))
                    if(foundMember){
                      setSelectedMember(foundMember)
                      setOpen(false)
                    }
                  }}
                >
                  {member.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedMember === member ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={!selectedMember} onClick={() => setSelectedMember(null)} variant="outline">Reset</Button>
        <Button disabled={!selectedMember} onClick={assign}>Assign</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default withProtectedComponent(Members, Claim.BoardWrite);