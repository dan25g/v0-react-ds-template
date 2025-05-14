"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"
import { useUser } from "./context/user-context"
import { useToast } from "@/components/ui/use-toast"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !user) {
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Debes iniciar sesión para acceder a esta página.",
      })
      router.push("/login")
    }
  }, [user, isLoading, router, toast])

  if (isLoading) {
    return <div className="container py-12 text-center">Cargando...</div>
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
