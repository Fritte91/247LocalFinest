"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
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
  category: string
  grower?: string
  artist?: string
  thc?: number
  cbd?: number
  strain?: string
}

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  grower?: string
  artist?: string
}

interface AppContextType {
  user: User | null
  cart: CartItem[]
  wishlist: WishlistItem[]
  isAuthenticated: boolean
  isAdmin: boolean
  login: (userData: User) => void
  logout: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  updateCartItemQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
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
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevWishlist, item]
      }
      return prevWishlist
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id)
  }

  const value = {
    user: session?.user ? {
      id: session.user.id as string,
      fullName: session.user.name as string,
      email: session.user.email as string,
      role: session.user.role as "user" | "admin"
    } : null,
    cart,
    wishlist,
    isAuthenticated: !!session,
    isAdmin: session?.user?.role === 'admin',
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
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