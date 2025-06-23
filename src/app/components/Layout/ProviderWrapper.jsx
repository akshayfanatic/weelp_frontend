"use client";
import { SessionProvider } from "next-auth/react";
import { useUIStore } from "@/lib/store/uiStore";
import { useIsClient } from "@/hooks/useIsClient";
import { Toaster } from "@/components/ui/toaster";
import Header from "./header";
import Footer from "./footer";

// Files Handle All Provider which used across the app
export default function AppProviders({ children }) {
  const isClient = useIsClient(); // hydration
  const { stickyHeader } = useUIStore();

  if (isClient) {
    return (
      <SessionProvider>
        <Header />
        <main className={`bg-mainBackground ${stickyHeader ? "pt-16" : ""}`}>
          {children}
          <Toaster />
        </main>
        <Footer />
      </SessionProvider>
    );
  }
}
