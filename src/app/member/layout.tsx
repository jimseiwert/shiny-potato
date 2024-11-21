import Renewal from "@/components/renewal";
import AuthLayout from "../layouts/layout-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
                <Renewal />
                {children}
        </AuthLayout>
    );
}