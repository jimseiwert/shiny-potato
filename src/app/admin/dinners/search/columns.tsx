"use client"


import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import Image from "next/image"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Member = {
    id: string
    picture: string
    name: string
    status: string
    email: string,
    homePhone: string,
    cellPhone: string,
    sponsor: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "date",
        header: "Dinner Date",
    },
    {
        accessorKey: "openReservations",
        header: "Open",
    },
    {
        accessorKey: "closeReservations",
        header: "Close",
    },
    {
        accessorKey: "reservations",
        header: "Reservations",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Open Now
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Close Now
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Email Batch</DropdownMenuItem>
                        <DropdownMenuItem>Delete Dinner</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]