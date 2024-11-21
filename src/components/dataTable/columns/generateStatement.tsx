
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, TriangleAlert } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import Image from 'next/image';
import { GenerateStatementSearchType } from "@/server/db/queries/statement";


export default function ColumnConfig(data: GenerateStatementSearchType[], setData: Dispatch<SetStateAction<GenerateStatementSearchType[]>>) {

    const preview = async (member: GenerateStatementSearchType): Promise<void> => {
        toast(`Getting Preview`);
       
        const response = await fetch(`/api/statement/generate`, {
            method: 'PATCH',
            body: JSON.stringify({members: [member.memberId], year: new Date().getFullYear() + 1, letter: 1}),
        })
        if (response.ok) {
            const pdf = await response.arrayBuffer();
            const blob = new Blob([pdf], { type: 'application/pdf' });
            window.open(URL.createObjectURL(blob));
        } else {
            toast.error('Failed to preview statement');
            return;
        }
    }

    const exclude = async (statement: GenerateStatementSearchType): Promise<void> => {
        setData(data.map((d) => {
            if(d.memberId === statement.memberId) {
                return {...d, exclude: !d.exclude}
            }
            return d;
        }))
    }

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
            accessorKey: "sendStatus",
            header: "Send Status",
            cell: ({ row }) => {
                const excluded: boolean = row.original.exclude;
                const success: boolean = row.original.success;
                const error: boolean = row.original.error;
                const msg: string = row.original.msg;

                if(excluded) {
                    return <div className="text-gray-500"><span><TriangleAlert size={12}/></span></div>
                } else {
                if(success == false && error == false) {
                    return <div className="text-gray-500">Pending</div>
                } else if(success) {
                    return <div className="text-green-500">Success</div>
                } else {
                    return <div className="text-red-500">{msg}</div>
                }
            }
            }
        },
        {
            id: "actions",
            cell: ({ row }: {row: any}) => {
                const exluded = row.original.exclude;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => preview(row.original)}
                            >Preview</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => exclude(row.original)}
                            > {exluded ? "Include" : "Exclude"}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}




