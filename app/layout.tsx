import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Appbar from "@/components/Appbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobile Money ",
  description: "Testing MTN MOMO and Airtel Money OpenAPIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>        
        <main className="flex">
          <Navbar />
          <div className="flex min-h-screen flex-col items-center justify-between bg-[#eee] flex-1">
            <Appbar />
            <div className="p-5 min-h-screen flex-col w-full">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
