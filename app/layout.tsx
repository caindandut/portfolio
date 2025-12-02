import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import MouseGlow from "@/components/mouse-glow"

const inter = Inter({ subsets: ["latin", "vietnamese"] })
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export const metadata: Metadata = {
  title: "Le Dang Khanh",
  description:
    "Le Dang Khanh - Web Developer from Da Nang, Vietnam. I create modern, responsive, and user-friendly web applications using React, Node.js, and MySQL.",
  keywords: ["Le Dang Khanh", "Web Developer", "React", "Node.js", "Full-Stack Developer", "Vietnam", "Portfolio"],
  authors: [{ name: "Le Dang Khanh" }],
  openGraph: {
    title: "Le Dang Khanh",
    description: "Le Dang Khanh - Modern web applications built with passion",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Dang Khanh",
    description: "Le Dang Khanh - Modern web applications built with passion",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00BFFF",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${firaCode.variable} font-sans antialiased`} suppressHydrationWarning>
        <MouseGlow />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
