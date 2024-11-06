'use client';
import { MemberSearchResults } from "@/app/interfaces/memberSearchResults.interface";
import MemberTag from "./memberTag";
import { useContext } from "react";
import { MemberSearchContext } from "../contexts/memberSearchProvider";
import PaginationFooter from "./memberSearchFooter";

export default function SearchTable({ data }: { data: MemberSearchResults[] }) {
  const { currentPage, itemsPerPage, handlePageChange, name, email, phone, memberType, status, personType } = useContext(MemberSearchContext)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = data.filter((person) => {
    const fullName = `${person.firstName} ${person.lastName}`;
    let shouldShowResult = true;
    if (name != '') {
      if (!fullName.toLowerCase().includes(name.toLowerCase())) {
        shouldShowResult = false;
      }
    }

    if (email != '') {
      if (!person.email?.toLowerCase().includes(email.toLowerCase())) {
        shouldShowResult = false;
      }
    }

    if (phone != '') {
      if (!person.homePhone.toLowerCase().includes(phone.toLowerCase())) {
        shouldShowResult = false;
      }
    }

    if (memberType.id != 'all') {
      if (person.type.id != memberType.id) {
        shouldShowResult = false;
      }
    }

    if (status.id != 'all') {
      if (person.status.id != status.id) {
        shouldShowResult = false;
      }
    }

    if (personType.id != 'all') {
      if (person.personType.id != personType.id) {
        shouldShowResult = false;
      }
    }

    return shouldShowResult;
  });

  const currentData = filteredData.slice(startIndex, endIndex);

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
          {currentData.map((person) => (
            <MemberTag key={person.email + person.id} person={person} />
          ))}
        </tbody>
      </table>
      <PaginationFooter totalItems={filteredData.length} />
    </>
  )
}