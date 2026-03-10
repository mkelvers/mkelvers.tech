import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
