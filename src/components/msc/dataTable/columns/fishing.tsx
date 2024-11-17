
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";
import { FishingPass } from "@/server/interfaces/fishing";
import Image from 'next/image';



export default function ColumnConfig() {
    

    return [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "pass",
            header: "Pass",
            cell: ({ row }) => {
                const pass = row.original.pass
                const year = row.original.year
                return <span>W{year}-{pass}</span>
            },
            sortingFn: (rowA, rowB) => {
                return (rowA.original?.pass > rowB.original?.pass) ? 1 : ((rowB.original?.pass > rowA.original?.pass) ? -1 : 0)
           },
           filterFn: (row, columnId, filterValue) => {
                return  row.original.pass === Number(filterValue);
        },
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
                 return (rowA.original?.member > rowB.original?.member) ? 1 : ((rowB.original?.member > rowA.original?.member) ? -1 : 0)
            },
            filterFn: (row, columnId, filterValue) => {
                const email = row.original.email || '';
                const name = row.original.member;
    
                return email.includes(filterValue) || name.includes(filterValue)
            },
            cell: ({ row }) => {
                const picture: string = row.original.picture;
                const name: string = row.original.member;
                const email: string = row.original.email;
    
                return <div className="flex items-center">
                    <div className="h-11 w-11 shrink-0">
                    {picture && <Image alt="" src={picture} width={44} height={44} className="h-11 w-11 rounded-full" />}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium">{name}</div>
                        <div className="mt-1">{email}</div>
                    </div>
                </div>
            },
        },
     
        {
            accessorKey: "used",
            header: "Used",
            cell: ({ row }) => {
                const used = Boolean(row.getValue("used"))
                const guest = Boolean(row.original.guest)
    
                if (used) {
                    if(guest) {
                        return <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">Used, Guest: {row.original.guest}</span>
                    }else {
                        return <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">Used</span>
                    }
                    
                } else {
                    return <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">Not Used</span>
                }
    
            }
        },
    ]
}




