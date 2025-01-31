import type { Metadata } from "next";
import { Gugi } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const gugi = Gugi({
  variable: "--font-gugi",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snake Game",
  description: "A classic Snake game built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(gugi.className, "antialiased")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
