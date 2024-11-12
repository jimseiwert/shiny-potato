
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bulletin } from "@/server/db/interfaces/bulletin";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import Image from 'next/image';



export default function ColumnConfig(data: unknown[], setData: Dispatch<SetStateAction<unknown[]>>) {
    

const onDelete = async (id: number): Promise<void> => {
    toast(`Deleting Assignment`);
    const response = await fetch(`/api/board?id=${id}`, {
        method: 'DELETE'
    })
    if(response.ok) {
        toast('Bulletin Deleted');
        setData(data.filter(b => b.id !== id))
        return;
    }else {
        toast.error('Failed to delete board assignment');
        return;
    }
}


const onEdit = async (bulletin: Bulletin): Promise<void> => {
    console.log(bulletin)
    toast(`Editing Assignment`);
    const response = await fetch(`/api/board`, {
        method: 'PATCH',
        body: JSON.stringify(bulletin),
    })
    if(response.ok) {
        toast('Assignment Edited');
        setData(data.map(b => b.id === bulletin.id ? bulletin : b))
        return;
    }else {
        toast.error('Failed to edit assignment');
        return;
    }
}



    return [
        {
            accessorKey: "id",
            header: "Id",
        },
        {
            accessorKey: "name",
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
            accessorKey: "endYear",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        End Year
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
                    const today = new Date();

                    return (<Select value={row.original.endYear + ''} onValueChange={(e) => onEdit({ ...row.original, endYear: Number(e) })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Yar" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={today.getFullYear() - 1 + ''}>{today.getFullYear() - 1}</SelectItem>
                            <SelectItem value={today.getFullYear() + ''}>{today.getFullYear()}</SelectItem>
                            <SelectItem value={today.getFullYear() + 1 + ''}>{today.getFullYear() + 1}</SelectItem>
                            <SelectItem value={today.getFullYear() + 2 + ''}>{today.getFullYear() + 2}</SelectItem>
                            <SelectItem value={today.getFullYear() + 3 + ''}>{today.getFullYear() + 3}</SelectItem>
                        </SelectContent>
                    </Select>)

            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const record = row.original
    
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
                            <DropdownMenuItem onClick={() => onDelete(record.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}




