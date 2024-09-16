import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/navbar';
import { ClerkProvider} from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>

  );
}