"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Leaf, Minus, Plus, Trash2, QrCode, ShoppingBag, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { useApp } from "@/lib/context"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useApp()
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()
  const [isCompletingOrder, setIsCompletingOrder] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const updateQuantity = (id: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    updateCartItemQuantity(id, newQuantity)
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  const handleCompleteOrder = async () => {
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your order",
        variant: "destructive",
      })
      return
    }

    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty",
        variant: "destructive",
      })
      return
    }

    setIsCompletingOrder(true)

    try {
      // Get user data first
      const userResponse = await fetch(`/api/users/${session.user.id}`);
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      // Create order data
      const orderData = {
        user: session.user.id,
        items: cart.map(item => {
          console.log('Cart item being processed:', item);
          console.log('Product ID being sent:', item.productId || item.id);
          return {
            product: item.productId || item.id, // Use productId if available, fallback to id
            quantity: item.quantity,
            price: item.price,
          };
        }),
        totalAmount: total,
        status: 'pending',
        paymentStatus: 'completed',
        paymentMethod: 'qr_code',
        customerInfo: {
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || session.user.email || '',
          phone: userData.phoneNumber || userData.phone || '',
        },
        shippingAddress: {
          street: userData.address?.street || '',
          city: userData.address?.city || '',
          state: userData.address?.state || '',
          zipCode: userData.address?.zipCode || '',
        },
      }

      console.log('Creating order with data:', orderData);

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json()

      // Clear cart after successful order
      clearCart()

      toast({
        title: "Order Completed!",
        description: `Your order #${order._id} has been successfully created.`,
      })

      // Redirect to order confirmation or profile
      router.push('/members/profile')
    } catch (error) {
      console.error('Error completing order:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to complete order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCompletingOrder(false)
    }
  }

  const handlePaymentConfirmation = () => {
    setPaymentConfirmed(true)
    toast({
      title: "Payment Confirmed",
      description: "Payment received! You can now complete your order.",
    })
  }

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
              <Button variant="outline" className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300">
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
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Current cart contents:', cart);
                clearCart();
                console.log('Cart cleared');
              }}
              className="border-red-600 text-red-400 hover:bg-red-900"
            >
              Debug: Clear Cart
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                console.log('Current cart contents:', cart);
              }}
              className="border-blue-600 text-blue-400 hover:bg-blue-900"
            >
              Debug: Log Cart
            </Button>
          </div>
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
                            className="bg-sage-900 border-red-500 text-red-400 hover:bg-red-900/50 hover:text-red-300"
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
                              className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 h-8 w-8 p-0"
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
                              className="bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300 h-8 w-8 p-0"
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
                    {paymentConfirmed 
                      ? "Payment confirmed! Complete your order below."
                      : "Scan the QR code below to complete your payment securely"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {!paymentConfirmed ? (
                    <>
                      <div className="bg-white p-6 rounded-lg mb-4 inline-block">
                        <QrCode className="h-32 w-32 text-black mx-auto" />
                      </div>
                      <p className="text-sage-300 text-sm mb-4">
                        Total: <span className="font-bold text-white">${total.toFixed(2)}</span>
                      </p>
                      <Button 
                        className="w-full premium-gradient text-white" 
                        onClick={handlePaymentConfirmation}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Confirm Payment
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="bg-green-900 p-6 rounded-lg mb-4 inline-block">
                        <CheckCircle className="h-32 w-32 text-green-400 mx-auto" />
                      </div>
                      <p className="text-green-400 text-sm mb-4 font-semibold">
                        Payment Confirmed! ✅
                      </p>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white" 
                        onClick={handleCompleteOrder}
                        disabled={isCompletingOrder}
                      >
                        {isCompletingOrder ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Creating Order...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Complete Order
                          </>
                        )}
                      </Button>
                    </>
                  )}
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
