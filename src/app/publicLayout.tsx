import Footer from "@/components/msc/footer";
import PublicTopNav from "@/components/msc/nav/publicTopNav";
import React from "react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex flex-col h-screen w-full">
            <PublicTopNav/>

            <div className="flex-grow overflow-hidden p-4">
                <div className="max-h-full">
                    {children}
                </div>
            </div>

            <div className="fixed w-full bottom-0">
                <Footer/>
            </div>

        </div>
    );
}