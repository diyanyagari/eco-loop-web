import SSOProvider from "@/components/SSOProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Pwa from "./PWA";
import ProgressBar from "@/components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Loop",
  description: "An eco-friendly app for sustainable living",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/recycle.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SSOProvider>
          <ProgressBar />
          {children}
          <Pwa />
          <Toaster richColors />
        </SSOProvider>
      </body>
    </html>
  );
}
