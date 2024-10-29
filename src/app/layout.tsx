import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export const metadata: Metadata = {
  title: "Maywood Sportsmen's Club",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <UserProvider>
      <body
      >
        {children}
      </body>
      </UserProvider>
    </html>
  );
}
