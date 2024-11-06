import type { Metadata } from "next";
import "@/styles/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { RouteProvider } from "./context/route-context";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Maywood Sportsmen's Club",
  description: "Members only sportsmen's club",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
    <UserProvider>
      <body>
        <RouteProvider>
              {children}
        </RouteProvider>
      </body>
    </UserProvider>
  </html>
    // <html lang="en" suppressHydrationWarning>
    //   <UserProvider>
    //     <body>
    //       <RouteProvider>
    //         <ThemeProvider
    //           attribute="class"
    //           defaultTheme="system"
    //           enableSystem>
    //           <SidebarProvider>
    //             {children}
    //           </SidebarProvider>
    //         </ThemeProvider>
    //       </RouteProvider>
    //     </body>
    //   </UserProvider>
    // </html>
  );
}
