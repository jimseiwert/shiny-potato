import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { RouteProvider } from "../context/route-context";
import { AppSidebar } from "@/components/msc/sidebar/SideBar";
import AuthTopNav from "@/components/msc/topNav/authTopNav";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
