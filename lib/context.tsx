"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

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
  image?: string
  category?: string
  grower?: string
  artist?: string
  thc?: string | number
  cbd?: string | number
  strain?: string
  [key: string]: any
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
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])

  // Load user and cart from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save user and cart to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
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
    user,
    cart,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
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