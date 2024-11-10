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
    status: {
        id: number
        color: string
        name: string
    }
    memberType: {
        id: number,
        name: string
    },
    email: string,
    homePhone: string,
    cellPhone: string,
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
        accessorKey: "member",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Member
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB) => {
             return (rowA.original?.name > rowB.original?.name) ? 1 : ((rowB.original?.name > rowA.original?.name) ? -1 : 0)
        },
        filterFn: (row, columnId, filterValue) => {
            const email = row.original.email || '';
            const name = row.original.name;
            const homePhone = row.original.homePhone || '';
            const cellPhone = row.original.cellPhone || '';

            return email.includes(filterValue) || name.includes(filterValue)|| homePhone.includes(filterValue)|| cellPhone.includes(filterValue)
        },
        cell: ({ row }) => {
            const picture: string = row.original.picture;
            const name: string = row.original.name;
            const email: string = row.original.email;

            return <div className="flex items-center">
                <div className="h-11 w-11 shrink-0">
                    <Image alt="" src={picture} width={44} height={44} className="h-11 w-11 rounded-full" />
                </div>
                <div className="ml-4">
                    <div className="font-medium">{name}</div>
                    <div className="mt-1">{email}</div>
                </div>
            </div>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        sortingFn: (rowA, rowB) => {
            return (rowA.original?.status.name > rowB.original?.status.name) ? 1 : ((rowB.original?.status.name > rowA.original?.status.name) ? -1 : 0)
       },
        filterFn: (row, id, value) => {
            return value.includes(row.original.status.id + '')
          },
        cell: ({ row }) => {
            const status = row.getValue<{ color: string, name: string }>("status")

            return <span className={classNames(
                status.color,
                "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
            )}>
                {status.name}
            </span>
        },
    },
    {
        accessorKey: "memberType",
        header: () => <div>Member Type</div>,
        filterFn: (row, id, value) => {
            return value.includes(row.original.memberType.id + '')
          },
          sortingFn: (rowA, rowB) => {
            return (rowA.original?.memberType.name > rowB.original?.memberType.name) ? 1 : ((rowB.original?.memberType.name > rowA.original?.memberType.name) ? -1 : 0)
       },
        cell: ({ row }) => {
            const memberType = row.getValue<{ id: number, name: string }>("memberType")

            return memberType.name
        },
    },
    {
        accessorKey: "homePhone",
        header: "Home Phone",
    },
    {
        accessorKey: "cellPhone",
        header: "Cell Phone",
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
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]