import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

const satoshi = localFont({
  src: './fonts/Satoshi-Medium.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '500',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mkelvers.tech'),
  title: {
    default: 'Mikkel Elvers',
    template: '%s | Mikkel Elvers',
  },
  description: 'Frontend-focused web developer and anime enjoyer',
  keywords: [
    'frontend developer',
    'web developer',
    'react',
    'typescript',
    'next.js',
    'mikkel elvers',
    'mikkel nothlev',
    'mkelvers',
    'mikkel nothlev elvers',
    'portfolio',
  ],
  authors: [{ name: 'Mikkel Elvers', url: 'https://mkelvers.tech' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mikkel Elvers | Frontend Developer',
    description:
      'Frontend-focused web developer and anime enjoyer. Building clean, efficient web experiences.',
    url: 'https://mkelvers.tech',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} bg-background text-foreground antialiased min-h-screen font-satoshi text-lg`}
      >
        <div className="grid grid-rows-[10vh_auto] place-items-center p-6">
          <main className="row-start-2 w-full max-w-4xl">{children}</main>
        </div>
      </body>
    </html>
  )
}
