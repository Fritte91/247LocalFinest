"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ShoppingCart, User } from "lucide-react"

interface MobileNavProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  cartItemCount?: number
  currentPath: string
}

export function MobileNav({ mobileMenuOpen, setMobileMenuOpen, cartItemCount = 0, currentPath }: MobileNavProps) {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-sage-300 hover:text-white transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? "max-h-96 opacity-100 border-t border-sage-800" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="py-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/members" 
              className={`font-medium px-2 py-2 ${
                currentPath === "/members" 
                  ? "text-white border-l-4 border-forest-500 bg-sage-900/30" 
                  : "text-sage-300 hover:text-white transition-colors"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/members/community" 
              className={`font-medium px-2 py-2 ${
                currentPath === "/members/community" 
                  ? "text-white border-l-4 border-forest-500 bg-sage-900/30" 
                  : "text-sage-300 hover:text-white transition-colors"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="/members/growers" 
              className={`font-medium px-2 py-2 ${
                currentPath === "/members/growers" 
                  ? "text-white border-l-4 border-forest-500 bg-sage-900/30" 
                  : "text-sage-300 hover:text-white transition-colors"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Growers
            </Link>
            <Link href="/members/cart" className="px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start bg-sage-900 border-forest-500 text-forest-400">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="ml-2 gold-gradient text-white text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/members/profile" className="px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start bg-sage-900 border-forest-500 text-forest-400">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
} 