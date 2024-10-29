import Footer from "@/components/footer";
import TopNav from "@/components/topNav";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full h-screen">
   

        <div >
            <TopNav />
        </div>

        <div className="grow overflow-scroll">
            {children}
        </div>

        <div>
        <Footer/>
        </div>

    </div>
    )
}