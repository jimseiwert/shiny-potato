import Link from "next/link"
import React from "react";
import { ISideBarItem } from "@/server/interfaces/sideBarItem";

export default function SideBarItem({ item}: { item: ISideBarItem }) {
  //const pathname = usePathname();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  // const isActive = (path: string) => {
  //   return pathname === path || pathname.startsWith(`${path}/`);
  // };

  //const Icon = item.icon;

  return (
    <li key={item.name}>
      <Link
        href={item.href}
        className={classNames(
        //   isActive(item.href)
        //     ? 'bg-gray-800 text-white'
        //     : 'text-gray-400 hover:bg-gray-800 hover:text-white',
          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
        )}
      >
         <item.icon className="h-6 w-6 shrink-0"/> 
         {item.name}
      </Link>
    </li>

  )
}