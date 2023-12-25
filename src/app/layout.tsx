import type { Metadata } from "next";
import { Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const spline = Spline_Sans_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next-BART",
  description: "next-BART",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spline.className}>{children}</body>
      <Analytics />
    </html>
  );
}
