import AuthLayout from "../layouts/layout-auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}