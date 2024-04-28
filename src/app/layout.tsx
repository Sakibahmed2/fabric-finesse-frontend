import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "sonner";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Fabric finesse",
  description: "Welcome to Fabric finesse cloth brand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <AppRouterCacheProvider>
            <Toaster richColors position="top-right" />
            {children}
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
