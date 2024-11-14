import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { RouteProvider } from "../context/route-context";
import { AppSidebar } from "@/components/msc/sidebar/SideBar";
import AuthTopNav from "@/components/msc/topNav/authTopNav";
import { Toaster } from "@/components/ui/sonner"
import { UserProvider } from "@auth0/nextjs-auth0/client";


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <UserProvider>
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
                </SidebarProvider>
                <Toaster />
            </ThemeProvider>
        </RouteProvider>
        </UserProvider>
    );
}
