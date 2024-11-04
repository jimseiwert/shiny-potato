'use client';
import { MemberSearchResults } from "@/app/interfaces/memberSearchResults.interface";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  
export default function MemberTag({person}: {person: MemberSearchResults}) {
    const fullName = `${person.firstName} ${person.lastName}`;

    return (
        <tr>
            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                        <img alt="" src={person.picture} className="h-11 w-11 rounded-full" />
                    </div>
                    <div className="ml-4">
                        <div className="font-medium">{fullName} {person.id}</div>
                        <div className="mt-1">{person.email}</div>
                    </div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm">
                <div>{person.personType?.name}</div>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm">
                <span className={classNames(
              person.status.color,
              "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
            )}>
                    {person.status.name}
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-5 text-sm">{person.type.name}</td>
            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {person.firstName} {person.lastName}</span>
                </a>
            </td>
        </tr>
    );
}