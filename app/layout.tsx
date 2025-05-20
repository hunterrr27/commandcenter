import type React from "react"
import "@/app/globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Ubuntu_Mono } from "next/font/google"

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu-mono",
})

export const metadata = {
  title: "InsiderLab - Security CLI Aggregator",
  description: "A web application that aggregates common hacking and bug bounty CLI tools",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${ubuntuMono.variable}`}>
      <body className="min-h-screen bg-black text-white font-mono">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
