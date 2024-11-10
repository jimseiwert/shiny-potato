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
import { HomeIcon } from '@heroicons/react/20/solid'
import { usePathname } from "next/navigation";
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
        //<>
         <BreadcrumbItem key={"bc_"  + index}>
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
        //<BreadcrumbSeparator  key={"bcs_"  + index}/>
        //</>
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
