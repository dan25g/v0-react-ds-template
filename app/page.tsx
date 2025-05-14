import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Descubre y Participa en Subastas Exclusivas
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Encuentra artículos únicos y coleccionables. Puja, gana y lleva a casa tesoros exclusivos.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg">Comenzar Ahora</Button>
                </Link>
                <Link href="/auctions">
                  <Button variant="outline" size="lg">
                    Ver Subastas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Subastas destacadas"
                width={550}
                height={550}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Subastas Destacadas</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestras subastas más populares y no pierdas la oportunidad de conseguir artículos exclusivos.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-4">
                  <Image
                    src={`/placeholder.svg?height=200&width=300&text=Subasta ${item}`}
                    alt={`Subasta ${item}`}
                    width={300}
                    height={200}
                    className="rounded-md object-cover w-full"
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Artículo de Colección #{item}</h3>
                    <p className="text-sm text-muted-foreground">
                      Puja actual: €{Math.floor(Math.random() * 1000) + 100}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Finaliza en: {Math.floor(Math.random() * 24) + 1} horas
                    </p>
                  </div>
                  <Link href="/login">
                    <Button className="w-full">Ver Detalles</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Cómo Funciona</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Participar en nuestras subastas es fácil y seguro. Sigue estos simples pasos.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Regístrate</h3>
              <p className="text-center text-muted-foreground">
                Crea una cuenta para acceder a todas las subastas disponibles.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Explora</h3>
              <p className="text-center text-muted-foreground">
                Navega por las subastas activas y encuentra artículos que te interesen.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Puja y Gana</h3>
              <p className="text-center text-muted-foreground">
                Realiza tus pujas y gana artículos exclusivos a precios increíbles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Listo para comenzar?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Únete a nuestra comunidad de subastadores y encuentra artículos exclusivos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg">Registrarse</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
