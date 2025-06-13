"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Leaf, Minus, Plus, Trash2, QrCode, ShoppingBag, ArrowLeft } from "lucide-react"
import { useApp } from "@/lib/context"

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useApp()

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    updateCartItemQuantity(id, newQuantity)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <Link href="/members">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-xl text-sage-300">Review your premium cannabis selection</p>
        </div>

        {cart.length === 0 ? (
          <Card className="bg-sage-950 border-sage-800 text-center py-12">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-sage-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
              <p className="text-sage-300 mb-6">Add some premium products to get started</p>
              <Link href="/members">
                <Button className="premium-gradient">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="bg-sage-950 border-sage-800">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="rounded-lg object-cover"
                        />
                        <Badge className="absolute -top-2 -right-2 premium-gradient text-white capitalize text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-display font-semibold text-white">{item.name}</h3>
                            <p className="text-sage-300">
                              {item.grower ? `By ${item.grower}` : item.artist ? `By ${item.artist}` : null} • ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="border-red-600 text-red-400 hover:bg-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {item.thc && (
                          <div className="flex gap-2 mb-4">
                            <Badge variant="outline" className="border-forest-500 text-forest-400 text-xs">
                              THC: {item.thc}
                            </Badge>
                            <Badge variant="outline" className="border-sage-500 text-sage-400 text-xs">
                              CBD: {item.cbd}
                            </Badge>
                            <Badge variant="outline" className="border-gold-500 text-gold-400 text-xs">
                              {item.strain}
                            </Badge>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="border-sage-600 text-sage-300 hover:bg-sage-800 h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 text-center bg-black border-sage-700 text-white h-8"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="border-sage-600 text-sage-300 hover:bg-sage-800 h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-sage-950 border-sage-800">
                <CardHeader>
                  <CardTitle className="text-white font-display">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sage-300">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sage-300">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-sage-700" />
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardHeader>
                  <CardTitle className="text-white font-display flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-forest-500" />
                    QR Code Payment
                  </CardTitle>
                  <CardDescription className="text-sage-300">
                    Scan the QR code below to complete your payment securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-white p-6 rounded-lg mb-4 inline-block">
                    <QrCode className="h-32 w-32 text-black mx-auto" />
                  </div>
                  <p className="text-sage-300 text-sm mb-4">
                    Total: <span className="font-bold text-white">${total.toFixed(2)}</span>
                  </p>
                  <Button className="w-full premium-gradient text-white">Generate Payment QR Code</Button>
                </CardContent>
              </Card>

              <Card className="bg-sage-950 border-sage-800">
                <CardContent className="p-4">
                  <div className="text-center text-sage-300 text-sm">
                    <p className="mb-2">🔒 Secure Payment</p>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
