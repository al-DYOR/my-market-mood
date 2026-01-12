import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import MiniKitWrapper from "./MiniKitWrapper"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Market Mood today",
  description: "Your current state based on today's market and your on-chain identity",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Market Mood today</title>
        <meta name="description" content="Your current state based on today's market and your on-chain identity" />

        {/* Иконки */}
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/icon-512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-512.png" sizes="512x512" />
        <link rel="mask-icon" href="/icon-512.png" color="#000000" />

        {/* Тема */}
        <meta name="theme-color" content="#000000" />
      </head>

      <body className={`${geist.className} ${geistMono.variable} antialiased`}>
        <MiniKitWrapper />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
