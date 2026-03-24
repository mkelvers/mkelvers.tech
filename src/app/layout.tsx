import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import './globals.css'

const font = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  display: 'swap',
  subsets: ['latin'],
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
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Mikkel Elvers',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Mikkel Elvers | Frontend Developer',
    description:
      'Frontend-focused web developer and anime enjoyer. Building clean, efficient web experiences.',
    images: ['/icon.png'],
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
        className={`${font.variable} font bg-background text-foreground antialiased min-h-screen text-lg`}
      >
        <div className="grid grid-rows-[10vh_auto] place-items-center p-6">
          <main className="row-start-2 w-full max-w-4xl">{children}</main>
        </div>
      </body>
    </html>
  )
}
