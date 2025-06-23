"use client";

import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import { useUIStore } from "@/lib/store/uiStore";
import { Inter, Roboto, Poppins } from "next/font/google";



const inter = Inter({ subsets: ["latin"], display: "swap" });
const roboto = Roboto({ subsets: ["latin"], display: "swap", weight: "400" });
const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: "400" });

const fontMap = {
  Inter: inter.className,
  Roboto: roboto.className,
  Poppins: poppins.className,
};

export default function RootLayout({ children }) {
  const theme = useUIStore((state) => state.theme);
  const font = useUIStore((state) => state.font);

  return (
    <html
      lang="en"
      className={`${theme === "dark" && "dark"} ${
        fontMap[font] || inter.className
      }`}
      
    >
      <body className="flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
