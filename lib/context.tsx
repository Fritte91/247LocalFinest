"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react"

interface User {
  id: string
  fullName: string
  email: string
  role: "user" | "admin"
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface AppContextType {
  user: User | null
  cart: CartItem[]
  isAuthenticated: boolean
  isAdmin: boolean
  login: (userData: User) => void
  logout: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  updateCartItemQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const login = (userData: User) => {
    // This is now handled by NextAuth
  }

  const logout = () => {
    // This is now handled by NextAuth
    setCart([])
  }

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id)
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prevCart, item]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartItemQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const value = {
    user: session?.user ? {
      id: session.user.id,
      fullName: session.user.name || '',
      email: session.user.email || '',
      role: session.user.role as "user" | "admin"
    } : null,
    cart,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'admin',
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
} 