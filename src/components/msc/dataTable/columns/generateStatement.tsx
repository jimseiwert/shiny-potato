
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import Image from 'next/image';
import { GenerateStatementSearchType } from "@/server/db/queries/statement";




export default function ColumnConfig(data: GenerateStatementSearchType[], setData: Dispatch<SetStateAction<GenerateStatementSearchType[]>>) {



    const exclude = async (minute: GenerateStatementSearchType): Promise<void> => {
        toast(`Publishing Bulletin`);
        const response = await fetch(`/api/bulletin/publish`, {
            method: 'POST',
            body: JSON.stringify({ id: minute.id }),
        })
        if (response.ok) {
            toast('Bulletin Published');
            minute.state = 'Publishing';
            setData(data.map(b => b.id === minute.id ? minute : b))
            return;
        } else {
            toast.error('Failed to publish bulletin');
            return;
        }
    }

    // member: {
    //     id: number;
    //     firstName: string | null;
    //     lastName: string | null;
    //     email: string | null;
    //     homePhone: string | null;
    //     cellPhone: string | null;
    // } | null,
    // spouse: {
    //     id: number;
    //     firstName: string | null;
    //     lastName: string | null;
    //     email: string | null;
    // } | null,
    // statement: {
    //     id: number;
    //     year: number;
    // } | null

    return [
        {
            accessorKey: "member",
            header: "member",
            cell: ({ row }) => {
                const picture: string = row.original.picture;
                const member: {firstName: string, lastName: string, email: string, homePhone: string, cellPhone: string} = row.original.member;
                if(!member) return null;
                return <div className="flex items-center">
                    <div className="h-11 w-11 shrink-0">
                    {picture && <Image alt="" src={picture} width={44} height={44} className="h-11 w-11 rounded-full" />}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium">{member.firstName} {member.lastName}</div>
                        <div className="mt-1">{member.email}</div>
                    </div>
                </div>
            },

        },
        {
            accessorKey: "memberType",
            header: "Member Type",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "spouse",
            header: "Spouse",
            cell: ({ row }) => {
                const spouse: {firstName: string, lastName: string, email: string} = row.original.spouse;
                if(!spouse) return null;
                return <div className="flex items-center">
                    <div className="ml-4">
                        <div className="font-medium">{spouse.firstName} {spouse.lastName}</div>
                        <div className="mt-1">{spouse.email}</div>
                    </div>
                </div>
            }
        },
        {
            id: "actions",
            cell: ({ row }: {row: any}) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => exclude(row.original)}
                            >Exclude</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}




