
import AuthTopNav from "@/components/msc/topNav/authTopNav";
import { AppSidebar } from "@/components/msc/sidebar/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppSidebar />
            <div className="w-full">
            <AuthTopNav/>
                {children}
            </div>
        </>
    );
}