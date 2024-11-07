"use client";

import React, { useContext } from "react";
import { MemberSearchContext } from "../contexts/memberSearchProvider";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

export function NameSearch() {
  const { name, setName} = useContext(MemberSearchContext);


    
    return (
        <div className="py-2">
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <input
                value={name}
                onChange={(e) => {setName(e.target.value);}}
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="block w-full rounded-full border-0 py-1.5 pr-10 ring-1 ring-inset"
            />
        </div>
    </div>
    )
}

export function EmailSearch() {
    const {email, setEmail} = useContext(MemberSearchContext);


    return (
        <div className="py-2">
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <input
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="block w-full rounded-full border-0 py-1.5 pr-10 ring-1 ring-inset"
            />
        </div>
    </div>
    )
}

export function PhoneSearch() {
    const { phone, setPhone} = useContext(MemberSearchContext);



    return (
        <div className="py-2">
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Phone
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
            <input
                value={phone}
                onChange={(e) => {setPhone(e.target.value)}}
                id="phone-number"
            name="phone-number"
            type="text"
                placeholder="+1 (555) 987-6543"
                className="block w-full rounded-full border-0 py-1.5 pr-10 ring-1 ring-inset"
            />
        </div>
    </div>
    )
}


export function MemberType({memberTypes}: {memberTypes: any[]}) {
    const {memberType, setMemberType, setCurrentPage} = useContext(MemberSearchContext);
    

    return (
        <div className="py-2">
        <Listbox value={memberType.id} onChange={setMemberType}>
        <Label className="block text-sm/6 font-medium text-gray-900">Member Type</Label>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
            <span className="block truncate">{memberType?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
  
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {[{id: 'all', name: 'All'}, ...memberTypes].map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.name}</span>
  
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      </div>
      )
}


export function PersonType({personTypes}: {personTypes: any[]}) {
    const {personType, setPersonType} = useContext(MemberSearchContext);
    
    return (
        <Listbox value={personType.id} onChange={setPersonType}>
        <Label className="block text-sm/6 font-medium text-gray-900">Person Type</Label>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
            <span className="block truncate">{personType?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
  
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {[{id: 'all', name: 'All'}, ...personTypes].map((person) => (
              <ListboxOption
                key={person.id}
                value={person}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{person.name}</span>
  
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      )
}

export function MemberStatus({memberStatus}: {memberStatus: any[]}) {
    const {status, setStatus} = useContext(MemberSearchContext);
  
    return (
        <Listbox value={status.id} onChange={setStatus}>
        <Label className="block text-sm/6 font-medium text-gray-900">Member Status</Label>
        <div className="relative mt-2">
          <ListboxButton className="relative w-full cursor-default rounded-full bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
            <span className="block truncate">{status?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>
  
          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {[{id: 'all', name: 'All'}, ...memberStatus].map((status) => (
              <ListboxOption
                key={status.id}
                value={status}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{status.name}</span>
  
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      )
}