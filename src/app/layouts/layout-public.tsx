import Footer from "@/components/msc/footer/public-footer";
import PublicTopNav from "@/components/msc/topNav/publicTopNav";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="bg-white">
            <PublicTopNav/>
            {children}
            {/* Footer */}
            <Footer />
        </div>
    );
}
