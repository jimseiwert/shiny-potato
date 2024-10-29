import TopNav from "../member/TopNav";
import SideBar from "../member/SideBar";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex w-full h-screen">
            <div className="w-1/6 bg-gray-800">
            <SideBar/>
            </div>
            <div className="flex-grow overflow-scroll">
                <div className="p-4"><TopNav/></div>
                <div className="grow overflow-scroll border-t-2">{children}</div>
                
            </div>
        </div>
        )
  }