"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Clock, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUser } from "../context/user-context"

// Mock data for auctions
const mockAuctions = [
  {
    id: "1",
    title: "Reloj Vintage de Colección",
    description: "Reloj de los años 50 en perfecto estado de funcionamiento.",
    currentBid: 450,
    endTime: new Date(Date.now() + 86400000), // 24 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Reloj",
    category: "Antigüedades",
  },
  {
    id: "2",
    title: "Cuadro de Arte Moderno",
    description: "Obra original firmada por el artista contemporáneo.",
    currentBid: 1200,
    endTime: new Date(Date.now() + 172800000), // 48 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Arte",
    category: "Arte",
  },
  {
    id: "3",
    title: "Consola de Videojuegos Retro",
    description: "Consola en su caja original con todos los accesorios.",
    currentBid: 350,
    endTime: new Date(Date.now() + 259200000), // 72 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Consola",
    category: "Electrónica",
  },
  {
    id: "4",
    title: "Moneda Antigua Romana",
    description: "Moneda de la época del Imperio Romano en excelente estado.",
    currentBid: 800,
    endTime: new Date(Date.now() + 345600000), // 96 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Moneda",
    category: "Numismática",
  },
  {
    id: "5",
    title: "Guitarra Firmada por Músico Famoso",
    description: "Guitarra eléctrica con autógrafo del artista.",
    currentBid: 2500,
    endTime: new Date(Date.now() + 432000000), // 120 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Guitarra",
    category: "Música",
  },
  {
    id: "6",
    title: "Libro Primera Edición",
    description: "Ejemplar de primera edición en perfecto estado.",
    currentBid: 600,
    endTime: new Date(Date.now() + 518400000), // 144 hours from now
    image: "/placeholder.svg?height=200&width=300&text=Libro",
    category: "Literatura",
  },
]

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState(mockAuctions)
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const { user, isLoading } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Debes iniciar sesión para ver las subastas.",
      })
      router.push("/login")
    }
  }, [user, isLoading, router, toast])

  // Filter auctions based on search term and category
  const filteredAuctions = auctions.filter((auction) => {
    const matchesSearch =
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "" || auction.category === category
    return matchesSearch && matchesCategory
  })

  const handleBid = (auctionId: string) => {
    // In a real app, this would open a modal or navigate to a bidding page
    toast({
      title: "Puja registrada",
      description: "Tu puja ha sido registrada correctamente.",
    })
  }

  // Format remaining time
  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Finalizada"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  if (isLoading || !user) {
    return <div className="container py-12 text-center">Cargando...</div>
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Subastas Disponibles</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar subastas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            <SelectItem value="Antigüedades">Antigüedades</SelectItem>
            <SelectItem value="Arte">Arte</SelectItem>
            <SelectItem value="Electrónica">Electrónica</SelectItem>
            <SelectItem value="Numismática">Numismática</SelectItem>
            <SelectItem value="Música">Música</SelectItem>
            <SelectItem value="Literatura">Literatura</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Auctions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <Card key={auction.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={auction.image || "/placeholder.svg"} alt={auction.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{auction.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatTimeRemaining(auction.endTime)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{auction.description}</p>
                <p className="font-medium">Puja actual: €{auction.currentBid}</p>
                <p className="text-xs text-muted-foreground mt-1">Categoría: {auction.category}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleBid(auction.id)}>
                  Pujar
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No se encontraron subastas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
