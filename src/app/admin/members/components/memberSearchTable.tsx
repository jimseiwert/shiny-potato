'use client';
import MemberTag from "./memberTag";
import PaginationFooter from "./memberSearchFooter";
import { getAllMembers } from "@/server/queries/member/search";
import { useContext, useEffect } from "react";
import { MemberSearchContext } from "../contexts/memberSearchProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SearchTable() {
  
  const {items} = useContext(MemberSearchContext);


 // const members = await getAllMembers(searchParams);

  return (
    <>
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Member</TableHead>
      <TableHead></TableHead>
      <TableHead>Member Type</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Person Type</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {items.map((person) => (
            <MemberTag key={person.email + person.id} person={person} />
          ))}
  </TableBody>
</Table>
     
    </>
  )
}