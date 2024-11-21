import Footer from "@/components/footer/public-footer";
import PublicTopNav from "@/components/topNav/publicTopNav";

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
