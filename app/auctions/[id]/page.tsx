"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Clock, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUser } from "../../context/user-context"

// Mock auction details
const mockAuctionDetails = {
  id: "1",
  title: "Reloj Vintage de Colección",
  description:
    "Reloj de los años 50 en perfecto estado de funcionamiento. Este reloj ha sido cuidadosamente restaurado manteniendo todas sus piezas originales. Incluye su caja original y documentación de la época. Una pieza única para coleccionistas exigentes.",
  currentBid: 450,
  minBid: 460, // Minimum next bid
  endTime: new Date(Date.now() + 86400000), // 24 hours from now
  image: "/placeholder.svg?height=400&width=600&text=Reloj",
  category: "Antigüedades",
  seller: "AntiqueCollector",
  bidHistory: [
    { user: "Collector123", amount: 450, time: new Date(Date.now() - 3600000) },
    { user: "VintageEnthusiast", amount: 425, time: new Date(Date.now() - 7200000) },
    { user: "ArtDeco", amount: 400, time: new Date(Date.now() - 10800000) },
  ],
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [auction, setAuction] = useState(mockAuctionDetails)
  const [bidAmount, setBidAmount] = useState(auction.minBid.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, isLoading } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Debes iniciar sesión para ver los detalles de la subasta.",
      })
      router.push("/login")
    }

    // In a real app, fetch the auction details based on the ID
    // This is just a mock implementation
    console.log(`Fetching auction with ID: ${params.id}`)
  }, [user, isLoading, router, toast, params.id])

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const amount = Number.parseFloat(bidAmount)

    if (isNaN(amount) || amount < auction.minBid) {
      toast({
        variant: "destructive",
        title: "Puja inválida",
        description: `La puja debe ser al menos €${auction.minBid}.`,
      })
      setIsSubmitting(false)
      return
    }

    // In a real app, this would send the bid to the server
    setTimeout(() => {
      // Update the auction with the new bid
      const updatedAuction = {
        ...auction,
        currentBid: amount,
        minBid: amount + 10,
        bidHistory: [{ user: user?.name || "Usuario", amount, time: new Date() }, ...auction.bidHistory],
      }

      setAuction(updatedAuction)
      setBidAmount(updatedAuction.minBid.toString())

      toast({
        title: "Puja realizada con éxito",
        description: `Has pujado €${amount} por este artículo.`,
      })

      setIsSubmitting(false)
    }, 1000)
  }

  // Format remaining time
  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date()
    const diff = endTime.getTime() - now.getTime()

    if (diff <= 0) return "Finalizada"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    let result = ""
    if (days > 0) result += `${days} días `
    if (hours > 0 || days > 0) result += `${hours} horas `
    result += `${minutes} minutos`

    return result
  }

  // Format date for bid history
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (isLoading || !user) {
    return <div className="container py-12 text-center">Cargando...</div>
  }

  return (
    <div className="container py-12">
      <Button variant="outline" className="mb-6" onClick={() => router.push("/auctions")}>
        ← Volver a Subastas
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={auction.image || "/placeholder.svg"} alt={auction.title} fill className="object-cover" />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{auction.title}</h1>
            <p className="text-muted-foreground mt-2">Categoría: {auction.category}</p>
            <div className="flex items-center mt-2 text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              Vendedor: {auction.seller}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-amber-600 font-medium">
            <Clock className="h-5 w-5" />
            <span>Finaliza en: {formatTimeRemaining(auction.endTime)}</span>
          </div>

          <div>
            <h2 className="text-xl font-bold">Puja actual: €{auction.currentBid}</h2>
            <p className="text-sm text-muted-foreground">Puja mínima: €{auction.minBid}</p>
          </div>

          <form onSubmit={handleBid} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bidAmount" className="text-sm font-medium">
                Tu puja (€)
              </label>
              <Input
                id="bidAmount"
                type="number"
                min={auction.minBid}
                step="1"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Realizar Puja"}
            </Button>
          </form>

          <div className="pt-4">
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-muted-foreground">{auction.description}</p>
          </div>
        </div>
      </div>

      {/* Bid History */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Historial de Pujas</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {auction.bidHistory.map((bid, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{bid.user}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">€{bid.amount}</span>
                    <span className="text-sm text-muted-foreground">{formatDate(bid.time)}</span>
                  </div>
                </div>
              ))}
              {auction.bidHistory.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">No hay pujas para este artículo todavía.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
