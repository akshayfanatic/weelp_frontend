"use client";
import Header from "../components/Layout/header";
import Footer from "../components/Layout/footer";
import { Inter_Tight } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"],
  style: "normal",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interTight.className} antialiased tfc_scroll`}
        suppressHydrationWarning={true}
        suppressContentEditableWarning={true}
      >
        <SessionProvider>
          <Header />
          <main className="bg-mainBackground">
            {children}
            <Toaster />
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
