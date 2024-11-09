'use client';
import { MemberSearchResults } from "@/app/interfaces/memberSearchResults.interface";
import { TableRow, TableCell } from "@/components/ui/table";
import { redirect } from "next/navigation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export default function MemberTag({ person }: { person: MemberSearchResults }) {
    const fullName = `${person.firstName} ${person.lastName}`;

    return (
        <TableRow>
        <TableCell className="h-11 w-11 flex-shrink-0"><img alt="" src={person.picture} className="h-11 w-11 rounded-full" /></TableCell>
        <TableCell>
        <div className="ml-4">
                        <div className="font-medium">{fullName}</div>
                        <div className="mt-1">{person.email}</div>
                    </div>
        </TableCell>
        <TableCell>{person.type?.name}</TableCell>
        <TableCell className="text-right"> <span className={classNames(
                    person.status.color,
                    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
                )}>
                    {person.status.name}
                </span>
                </TableCell>

                <TableCell>{person.personType.name}</TableCell>
      </TableRow>
      
    );
}