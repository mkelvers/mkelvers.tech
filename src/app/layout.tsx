import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google"

import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Mikkel Elvers",
  description:
    "Frontend-focused web developer and anime enjoyer",
  keywords: [
    "frontend developer", "web developer", "react", "typescript",
    "next.js", "mikkel elvers", "mikkel nothlev", "mkelvers",
    "mikkel nothlev elvers", "portfolio"
  ],
  authors: [{ name: "Mikkel Elvers", url: "https://mkelvers.tech" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Mikkel Elvers | Frontend Developer",
    description:
      "Frontend-focused web developer and anime enjoyer. Building clean, efficient web experiences.",
    url: "https://mkelvers.tech",
    type: "website",
  },
  metadataBase: new URL("https://mkelvers.tech"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased min-h-screen font-mono text-lg`}
      >
        <div className="grid grid-rows-[10vh_auto] place-items-center">
          <div className="row-start-2 w-full max-w-4xl px-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
