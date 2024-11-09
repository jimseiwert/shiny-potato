import type { Metadata } from "next";
import "./globals.css";

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
        <body>
          {children}
        </body>
    </html>
  );
}
