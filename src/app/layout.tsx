import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "@/providers/AuthProvider";

import "@/libs/axiosInterceptor";
import Navbar from "@/components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket Booking App",
  description: "A real-time ticket booking system built with Next.js, Express, TypeScript, Prisma, PostgreSQL, Redis, BullMQ, Socket.IO, and OAuth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
        <AuthProvider>
        <Navbar/>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
