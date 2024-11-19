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
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell>{person.waitingListNumber}</TableCell>
                <TableCell className="text-right">{person.sponsor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      )
}