"use client"

import * as React from "react"
import { useSession } from "next-auth/react"

interface User {
  id: string
  fullName: string
  email: string
  role: "user" | "admin"
}

export interface CartItem {
  id: string | number
  productId?: string // MongoDB product ID for order creation
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
  id: string | number
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
  removeFromCart: (itemId: string | number) => void
  updateCartItemQuantity: (itemId: string | number, quantity: number) => void
  clearCart: () => void
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string | number) => void
  isInWishlist: (id: string | number) => boolean
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [user, setUser] = React.useState<User | null>(null)
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [wishlist, setWishlist] = React.useState<WishlistItem[]>([])

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
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

  const removeFromCart = (itemId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const updateCartItemQuantity = (itemId: string | number, quantity: number) => {
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

  const removeFromWishlist = (id: string | number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id))
  }

  const isInWishlist = (id: string | number) => {
    return wishlist.some((item) => item.id === id)
  }

  const value = {
    user: session?.user ? {
      id: (session.user as any).id as string,
      fullName: session.user.name as string,
      email: session.user.email as string,
      role: (session.user as any).role as "user" | "admin"
    } : null,
    cart,
    wishlist,
    isAuthenticated: !!session,
    isAdmin: (session?.user as any)?.role === 'admin',
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
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
} 