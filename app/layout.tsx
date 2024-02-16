import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { UIProvider } from "@/nextui"
import { MemoryProvider } from "@/context"
import Notify from '@/toast'
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Lista de tareas",
  description: "Organiza tus tareas de forma sencilla",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemoryProvider>
      <html lang="en" className={GeistSans.className}>
        <body className="bg-background text-foreground">
          <Notify />
          <UIProvider>
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
          </UIProvider>
        </body>
      </html>
    </MemoryProvider>
  )
}
