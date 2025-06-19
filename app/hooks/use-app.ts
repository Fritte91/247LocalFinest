"use client"

import { createContext, useContext, useState } from "react"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  category: "flowers" | "glassware" | "artwork"
  grower?: string
  artist?: string
  thc?: number
  cbd?: number
  strain?: string
}

interface AppContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  wishlist: string[]
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (id: string) => {
    setWishlist(prev => [...prev, id])
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(itemId => itemId !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlist.includes(id)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
} 