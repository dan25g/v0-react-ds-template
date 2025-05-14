"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
} | null

type UserContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // This is a mock login - in a real app, you would call an API
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const userData = {
        id: "1",
        name: email.split("@")[0],
        email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Credenciales inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // This is a mock registration - in a real app, you would call an API
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const userData = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Registration failed:", error)
      throw new Error("No se pudo completar el registro")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <UserContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
