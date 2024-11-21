import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { RouteProvider } from "../context/route-context";
import { AppSidebar } from "@/components/sidebar/SideBar";
import AuthTopNav from "@/components/topNav/authTopNav";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"
import Maintenance from "../maintenance";


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
        return (<Maintenance />)
    }
    return (
        <RouteProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full">
                        <AuthTopNav />
                        {children}
                    </div>
                    <Toaster />
                    <Sonner/>
                </SidebarProvider>
            </ThemeProvider>
        </RouteProvider>
    );
}
