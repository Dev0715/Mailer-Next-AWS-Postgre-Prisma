import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import StoreProvider from "../store/store-provider";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Toaster />
        <StoreProvider>
          <Providers>
            <body className={inter.className}>
              <div className="w-full min-h-full px-6 pt-6 flex flex-col items-center bg-gray-50 mb-[-48px] after:h-12">
                <Header />
                {children}
              </div>
              <Footer />
            </body>
          </Providers>
        </StoreProvider>
      </html>
    </SessionProvider>
  );
}
