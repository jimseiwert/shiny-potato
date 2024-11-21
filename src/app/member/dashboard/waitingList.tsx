import AvatarImg from "@/components/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetWaitingList } from "@/server/db/queries/member/waitingList";


export default async function WaitingList() {
    const members = await GetWaitingList();
    return (
        <div className="py-2 px-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Waiting List Number</TableHead>
                        <TableHead className="text-right">Sponsor</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map((person) => (
                        <TableRow key={person.memberId}>
                            <TableCell className="font-medium">
                                <div className="flex min-w-0 gap-x-4">
                                    <AvatarImg image={person.picture} name={person.name} />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm/6 font-semibold dark:text-white text-gray-900  hover:dark:text-gray-900">
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {person.name}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{person.waitingListNumber}</TableCell>
                            <TableCell className="text-right">{person.sponsor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}