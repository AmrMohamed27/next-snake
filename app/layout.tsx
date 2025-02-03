import type { Metadata } from "next";
import { Gugi } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const gugi = Gugi({
  variable: "--font-gugi",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "snake_game",
  description: "A classic Snake game built with Next.js and Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(gugi.className, "antialiased w-screen")}>
        <div className="w-full min-h-screen flex flex-col">
          <Header />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
