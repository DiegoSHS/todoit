import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { UIProvider } from "@/nextui"
import { MemoryProvider } from "@/context"
import Notify from '@/toast'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react"
import Link from "next/link"
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
        <body className="dark bg-background text-foreground">
          <UIProvider>
            <Notify />
            <main className="min-h-screen flex flex-col items-center">
              <Navbar>
                <NavbarBrand className="text-blue-300">
                  Tareas
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                  </svg>
                </NavbarBrand>
                <NavbarContent justify="center">
                  <NavbarItem>
                    <Link href="/" legacyBehavior passHref>
                      <Button variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Tareas
                      </Button>
                    </Link>
                  </NavbarItem>
                  <NavbarItem>
                    <Link href="/todo/" legacyBehavior passHref>
                      <Button variant="light">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nueva tarea
                      </Button>
                    </Link>
                  </NavbarItem>
                </NavbarContent>
              </Navbar>
              {children}
            </main>
          </UIProvider>
        </body>
      </html>
    </MemoryProvider >
  )
}
