'use client';
import { capitalizeWords } from '@/lib/utils';
import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from "next/navigation";
//import { capitalize } from "@/utils/textUtils"

export default function Breadcrumbs() {
    //const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
  
    const items = segments.map((item, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = capitalizeWords(item); //capitalize(item); // Capitalize the label (optional)
    
        return (
            <li key={item} className="flex">
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="h-full w-6 flex-shrink-0"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                href={href}
                aria-current={index == segments.length -1 ? 'page' : undefined}
                className="ml-4 text-sm font-medium"
              >
                {label}
              </Link>
            </div>
          </li>
        );
      });

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="ms-4 flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li className="flex w-5">
          <div className="flex items-center">
            <Link href="/member/dashboard">
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items}
      </ol>
    </nav>
  )
}
