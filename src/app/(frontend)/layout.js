import { Inter_Tight } from "next/font/google";
import "../globals.css";
import AppProviders from "../components/Layout/ProviderWrapper";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"],
  style: "normal",
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${interTight.className} antialiased tfc_scroll`} suppressHydrationWarning={true} suppressContentEditableWarning={true}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
