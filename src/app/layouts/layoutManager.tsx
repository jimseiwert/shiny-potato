'use client';
import Footer from "@/components/footer";
import Renewal from "@/components/renewal";
import { usePathname } from "next/navigation";
import SideBar from "../member/SideBar";
import AuthTopNav from "@/components/authTopNav";
import PublicTopNav from "@/components/publicTopNav";

export default function LayoutManager({ children }) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const protectedRoute = segments[0] === "member" || segments[0] === "admin";
    const isAdminRoute = segments[0] === "admin";
    if (protectedRoute) {
        return (
            <div className="flex w-full h-screen">
                
            <div className="w-1/6">
            <SideBar/>
            </div>
            <div className="flex-grow overflow-scroll gap-2">
            {(!isAdminRoute && <Renewal/>)}
            <AuthTopNav/>
           
                <div className="grow overflow-scroll">
                    {children}</div>
                
            </div>
        </div>
        );
    }else{
        return (
            <div className="flex flex-col w-full h-screen">
   

        <div >
            <PublicTopNav />
        </div>

        <div className="grow overflow-scroll">
            {children}
        </div>

        <div>
        <Footer/>
        </div>
        </div>
        );
    }

    }