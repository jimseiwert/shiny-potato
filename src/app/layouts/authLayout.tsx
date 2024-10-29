import TopNav from "../member/TopNav";
import SideBar from "../member/SideBar";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex w-full h-screen">
            <div className="w-1/6">
            <SideBar/>
            </div>
            <div className="flex-grow overflow-scroll gap-2">
            <TopNav/>
                <div className="grow overflow-scroll">
                    {children}</div>
                
            </div>
        </div>
        )
  }