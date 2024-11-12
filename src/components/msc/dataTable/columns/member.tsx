
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bulletin } from "@/server/db/interfaces/bulletin";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";
import Image from 'next/image';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function ColumnConfig(data: unknown[], setData: Dispatch<SetStateAction<unknown[]>>) {
    
const onDelete = async (bulletin: Bulletin): Promise<void> => {
    toast(`Deleting Bulletin`);
    const response = await fetch(`/api/bulletin?id=${bulletin.id}`, {
        method: 'DELETE'
    })
    if(response.ok) {
        toast('Bulletin Deleted');
        setData(data.filter(b => b.id !== bulletin.id))
        return;
    }else {
        toast.error('Failed to delete bulletin');
        return;
    }
}


const onEdit = async (bulletin: Bulletin): Promise<void> => {
    toast(`Editing Bulletin`);
    const response = await fetch(`/api/bulletin`, {
        method: 'PATCH',
        body: JSON.stringify(bulletin),
    })
    if(response.ok) {
        toast('Bulletin Edited');
        setData(data.map(b => b.id === bulletin.id ? bulletin : b))
        return;
    }else {
        toast.error('Failed to edit bulletin');
        return;
    }
}


const onPublish = async (bulletin: Bulletin): Promise<void> => {
    toast(`Publishing Bulletin`);
    const response = await fetch(`/api/bulletin/publish`, {
        method: 'POST',
        body: JSON.stringify({id: bulletin.id}),
    })
    if(response.ok) {
        toast('Bulletin Published');
        bulletin.state = 'Publishing';
        setData(data.map(b => b.id === bulletin.id ? bulletin : b))
        return;
    }else {
        toast.error('Failed to publish bulletin');
        return;
    }
}

    return [
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
            accessorKey: "status",
            meta: {
                options: []
            },
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
            meta: {
                options: []
            },
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
            accessorKey: "personType",
            header: () => <div>Person Type</div>,
            meta: {
                options: []
            },
            filterFn: (row, id, value) => {
                return value.includes(row.original.personType.id + '')
              },
            cell: ({ row }) => {
                const personType = row.getValue<{ id: number, name: string }>("personType")
    
                return personType.name
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
}




