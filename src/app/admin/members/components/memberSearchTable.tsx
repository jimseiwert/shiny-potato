'use client';
import MemberTag from "./memberTag";
import PaginationFooter from "./memberSearchFooter";
import { getAllMembers } from "@/server/queries/member/search";
import { useContext, useEffect } from "react";
import { MemberSearchContext } from "../contexts/memberSearchProvider";

export default function SearchTable() {
  
  const {items} = useContext(MemberSearchContext);


  console.log(name)
 // const members = await getAllMembers(searchParams);

  return (
    <>
      <table className="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Member Type
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
              Member Type
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((person) => (
            <MemberTag key={person.email + person.id} person={person} />
          ))}
        </tbody>
      </table>
      {/* <PaginationFooter totalItems={members.length} /> */}
    </>
  )
}