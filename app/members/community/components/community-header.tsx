"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/app/components/mobile-nav"
import { useApp, type CartItem } from "@/app/hooks/use-app"
import { Leaf, User, ShoppingCart } from "lucide-react"
import { useState } from "react"

export function CommunityHeaderWithMobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart } = useApp()
  const cartItemCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  return (
    <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-forest-500" />
            <span className="text-xl md:text-2xl font-display font-bold text-white">247LocalFinest</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/members" className="text-sage-300 hover:text-white font-medium transition-colors">
              Shop
            </Link>
            <Link href="/members/community" className="text-white font-medium border-b-2 border-forest-500 pb-1">
              Community
            </Link>
            <Link href="/members/growers" className="text-sage-300 hover:text-white font-medium transition-colors">
              Growers
            </Link>
            <Link href="/members/cart">
              <Button variant="outline" className="relative bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 gold-gradient text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/members/profile">
              <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 transition-all duration-300">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              cartItemCount={cartItemCount}
              currentPath="/members/community"
            />
          </div>
        </div>
      </div>
    </header>
  )
} 