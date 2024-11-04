'use client';
import { usePathname } from "next/navigation";
import { createContext } from "react";

export const RouteContext = createContext({
    protectedRoute: false,
    isAdminRoute: false,
});

export const RouteProvider = ({ children }: {children: React.ReactNode}) => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const protectedRoute = segments[0] === "member" || segments[0] === "admin";
    const isAdminRoute = segments[0] === "admin";

    return (
        <RouteContext.Provider value={{protectedRoute, isAdminRoute}}>
        {children}
        </RouteContext.Provider>
    )
}