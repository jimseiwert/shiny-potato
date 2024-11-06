
import AuthTopNav from "@/components/msc/topNav/authTopNav";
import Renewal from "@/components/msc/renewal";
import { AppSidebar } from "@/components/msc/sidebar/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppSidebar />
            <div className="w-full">
                <Renewal/>
                <AuthTopNav/>
                {children}
            </div>
        </>
    );
}