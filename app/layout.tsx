import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import Link from "next/link"
import type { ReactNode } from "react"
import { UserProvider } from "./context/user-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <UserProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between">
                  <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                      <span className="text-xl font-bold">SubastaYa</span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Inicio
                      </Link>
                      <Link href="/auctions" className="text-sm font-medium transition-colors hover:text-primary">
                        Subastas
                      </Link>
                      <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                        Nosotros
                      </Link>
                    </nav>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Registrarse
                    </Link>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} SubastaYa. Todos los derechos reservados.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/terms" className="text-sm font-medium transition-colors hover:text-primary">
                      Términos
                    </Link>
                    <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
                      Privacidad
                    </Link>
                    <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                      Contacto
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
