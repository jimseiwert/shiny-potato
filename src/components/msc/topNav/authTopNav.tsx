'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Breadcrumbs from '@/components/msc/nav/breadcrumbs'
import { ModeToggle } from '@/components/msc/theme-toggle'
import Link from 'next/link'
import { useUser } from "@auth0/nextjs-auth0"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from "react"

const userNavigation = [
    { name: 'Your Profile', href: '/member/profile' },
]

export default function AuthTopNav() {
    const { user, isLoading, error } = useUser()
    const [open, setOpen] = React.useState<boolean>(false)

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    if (isLoading) return <div>Loading...</div>
    return (
        user && (<div className='h-14 flex justify-between items-center px-4 gap-4'>
            <div></div>
            <div className='grow'><Breadcrumbs /></div>
            <div className="w-8"><ModeToggle /></div>
            <div className="w-8 items-end">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger> <Avatar>
                        <AvatarImage src={user.picture} />
                        <AvatarFallback>{user.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link href="/member/profile" legacyBehavior passHref>
                            <DropdownMenuItem onClick={() => setOpen(false)}>Profile</DropdownMenuItem>
                        </Link>
                        <a href="/auth/logout">
                            <DropdownMenuItem onClick={() => setOpen(false)}>Logout</DropdownMenuItem>
                        </a>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </div>)
    )
}
