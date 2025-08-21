"use client";

import { SessionProvider } from "next-auth/react";
import { useIsClient } from "@/hooks/useIsClient";
import { Toaster } from "@/components/ui/toaster";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetchers";

export default function AppProviders({ children, session }) {
  const isClient = useIsClient();  // preven hydration error

  if (!isClient) return null;

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: true,
          shouldRetryOnError: false,
        }}
      >
        {children}
        <Toaster />
      </SWRConfig>
    </SessionProvider>
  );
}
