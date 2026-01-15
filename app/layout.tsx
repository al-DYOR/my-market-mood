import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import MiniKitWrapper from "./MiniKitWrapper"
import { Providers } from './providers'

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Market Mood today",
  description: "Your current state based on today's market and on-chain identity",
  generator: "v0.app",

  // Обязательно для PWA / Base App / Farcaster embedded
  manifest: "/.well-known/farcaster.json",  // ← манифест

  // * 🔥 Base App верификация */
  other: {
    'base:app_id': '69672cf14991800a6d9d61ff',
  },

  // Иконки — расширяем для всех платформ
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
      // Добавляем стандартные размеры для Android/PWA/Base App
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-192.png",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-167x167.png", sizes: "167x167" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },

  // Делает приложение нативным на iOS (Base App использует)
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Market Mood today",
  },

  // Цвета приложения (влияет на статус-бар и сплеш)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],

  // Open Graph — для шаринга в Farcaster, X, Telegram и т.д.
  openGraph: {
    title: "Market Mood today",
    description: "Mint your trading state as unique pixel monster NFT (0.00002 ETH)",
    url: "https://v0-mymarketmood.vercel.app/",
    siteName: "Market Mood",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Market Mood NFT Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter/X card (Warpcast тоже использует)
  twitter: {
    card: "summary_large_image",
    title: "Market Mood today",
    description: "Mint your trading state NFT",
    images: ["/opengraph-image.jpg"],
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
        {/* Обязательно для PWA / Base App / Farcaster */}
        <link rel="manifest" href="/.well-known/farcaster.json" />

        {/* Для нативного вида */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" />

        {/* Иконки — оставим мои */}
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/icon-512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-512.png" sizes="512x512" />
        <link rel="mask-icon" href="/icon-512.png" color="#000000" />

        {/* 🔥🔥 BASE APP CRITICAL — СТРОКА 🔥🔥 */}
  <meta name="base:app_id" content="69672cf14991800a6d9d61ff" />

  {/* Обязательные для Farcaster Frame */}
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="https://v0-mymarketmood.vercel.app/opengraph-image.jpg" />
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1" /> {/* или "1:1" для квадратного */}
  <meta property="fc:frame:button:1" content="Open Market Mood" />
  <meta property="fc:frame:button:1:action" content="post" />
  <meta property="fc:frame:button:1:target" content="https://v0-mymarketmood.vercel.app/api/frame" />  {/* ← сюда указываем на наш новый endpoint */}

  {/* Open Graph (для шаринга и Base App) */}
  <meta property="og:title" content="Market Mood Today" />
  <meta property="og:description" content="Mint your trading state as unique pixel monster NFT (0.00002 ETH)" />
  <meta property="og:image" content="https://v0-mymarketmood.vercel.app/opengraph-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://v0-mymarketmood.vercel.app/" />
  <meta property="og:type" content="website" />

  {/* Twitter/X card (Warpcast использует) */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Market Mood Today" />
  <meta name="twitter:description" content="Mint your trading state NFT" />
  <meta name="twitter:image" content="https://v0-mymarketmood.vercel.app/opengraph-image.jpg" />

  {/* PWA / Base App / Farcaster embedded */}
  <link rel="manifest" href="/.well-known/farcaster.json" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geist.className} ${geistMono.className} antialiased`}>
        <MiniKitWrapper />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
