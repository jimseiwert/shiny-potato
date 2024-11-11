"use client"
import { Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Bulletin } from "./bulletin"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"

interface BulletinColumnProps {
    onDelete: (bulletin: Bulletin) => void
    onEdit: (bulletin: Bulletin) => void
    onPublish: (bulletin: Bulletin) => void
}

export const getBulletinColumns = ({ onDelete, onEdit, onPublish }: BulletinColumnProps): ColumnDef<Bulletin>[] => [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const month = Number(row.original.month);
            const year = Number(row.original.year);
            const bulletinDate = new Date(year, month - 1)

            return <span>
                {bulletinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
        },

    },
    {
        accessorKey: "year",
        header: "Year",
        cell: ({ row }) => {
            const state = row.original.state;

            if (state != 'Draft') {
                return <span>{row.original.year}</span>
            } else {
                const today = new Date();

                return (<Select value={row.original.year + ''} onValueChange={(e) => onEdit({ ...row.original, year: Number(e) })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Yar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={today.getFullYear() - 1 + ''}>{today.getFullYear() - 1}</SelectItem>
                        <SelectItem value={today.getFullYear() + ''}>{today.getFullYear()}</SelectItem>
                        <SelectItem value={today.getFullYear() + 1 + ''}>{today.getFullYear() + 1}</SelectItem>
                    </SelectContent>
                </Select>)
            }
        }
    },
    {
        accessorKey: "month",
        header: "Month",
        cell: ({ row }) => {
            const state = row.original.state;

            if (state != 'Draft') {
                const month = Number(row.original.month);
                const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });

                return <span>{monthName}</span>
            } else {
                return (<Select value={row.original.month + ''} onValueChange={(e) => onEdit({ ...row.original, month: Number(e) })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">Janurary</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                </Select>)
            }
        }
    },
    {
        accessorKey: "state",
        header: "Status",
        cell: ({ row }) => {
            const state = row.getValue("state")
            switch (state) {
                case "Draft":
                    return <Button variant={"destructive"} onClick={() => { onPublish(row.original) }}> Draft, click here to publish</Button>
                case "Publishing":
                    return <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"><Loader2 className="animate-spin" /> ... publishing</span>
                case "Published":
                    return <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">Published</span>
            }

        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const state = row.original.state;

            if (state === 'Draft') {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onPublish(row.original)}
                            >Publish</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDelete(row.original)}
                            >Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            } else {
                return null;
            }
        },
    },
]