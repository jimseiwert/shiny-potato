
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bulletin } from "@/server/db/interfaces/bulletin";
import { MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { RingLoader } from "react-spinners";




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
}




