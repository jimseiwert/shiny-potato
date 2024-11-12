'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { SidebarTrigger } from '@/components/ui/sidebar';
import { capitalizeWords } from '@/lib/utils';
import { usePathname } from "next/navigation";
import React from "react";
//import { capitalize } from "@/utils/textUtils"

export default function Breadcrumbs() {
  //const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const items = segments.map((item, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const label = capitalizeWords(item); //capitalize(item); // Capitalize the label (optional)

    if(index < segments.length - 1 ) {
      return (
        <React.Fragment key={"bc_"  + index}>
         <BreadcrumbItem >
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        </React.Fragment>
      )
    }else{
      return (
        <BreadcrumbItem key={"bc_"  + index}>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    }
  });

  return (
    <>
    <SidebarTrigger />
    <Breadcrumb>
      <BreadcrumbList>
        {items}
      </BreadcrumbList>
    </Breadcrumb>
    </>
  )
}
