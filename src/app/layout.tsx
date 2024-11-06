import type { Metadata } from "next";
import "@/styles/globals.css";
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
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
