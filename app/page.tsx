"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, Users, ArrowRight, Star, Shield, Truck, Sparkles } from "lucide-react"

export default function HomePage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  const promotions = [
    {
      title: "Premium Indoor Collection",
      description: "Hand-selected strains from master growers",
      discount: "25% OFF",
      validUntil: "Dec 31, 2024",
    },
    {
      title: "Artisan Glass Collection",
      description: "Handcrafted pieces by renowned artists",
      discount: "20% OFF",
      validUntil: "Jan 15, 2025",
    },
    {
      title: "New Member Welcome",
      description: "Exclusive pricing for first-time members",
      discount: "30% OFF",
      validUntil: "Ongoing",
    },
  ]

  const growers = [
    {
      name: "Marcus Chen",
      specialty: "Hydroponic Systems",
      experience: "12 years",
      awards: ["Cannabis Cup Winner 2023", "Best Indoor Grow 2022"],
    },
    {
      name: "Sarah Rodriguez",
      specialty: "Organic Cultivation",
      experience: "8 years",
      awards: ["Sustainable Grower Award", "Organic Excellence 2023"],
    },
    {
      name: "David Thompson",
      specialty: "Genetics & Breeding",
      experience: "15 years",
      awards: ["Strain Innovation Award", "Master Breeder 2023"],
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">247 LocalFinest</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#about" className="text-sage-300 hover:text-white font-medium transition-colors">
                About
              </Link>
              <Link href="#growers" className="text-sage-300 hover:text-white font-medium transition-colors">
                Growers
              </Link>
              <Link href="#promotions" className="text-sage-300 hover:text-white font-medium transition-colors">
                Promotions
              </Link>
              <Link href="/signin">
                <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                  Sign In
                </Button>
              </Link>
              <Button className="premium-gradient text-white font-semibold" onClick={() => setIsSignupOpen(true)}>
                Join Members
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-sage-950 via-sage-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-grid"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-500/10 to-transparent"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-6xl md:text-8xl font-display font-bold text-white mb-6 leading-tight animate-fade-in-down"
            >
              Premium Cannabis
              <span className="block text-forest-400 bg-clip-text text-transparent bg-gradient-to-r from-forest-400 to-gold-400">
                Crafted with Excellence
              </span>
            </h1>
            <p 
              className="text-xl text-sage-300 mb-12 leading-relaxed animate-fade-in-up animation-delay-300"
            >
              Experience the finest cannabis products from our award-winning collective of master growers. Where quality
              meets craftsmanship in every harvest.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in animation-delay-500"
            >
              <Button
                size="lg"
                className="premium-gradient text-white px-10 py-6 text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg shadow-forest-500/20"
                onClick={() => setIsSignupOpen(true)}
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sage-600 text-sage-300 hover:bg-sage-800/50 px-10 py-6 text-lg backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-sage-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="text-center p-10 rounded-2xl dark-glass backdrop-blur-sm border border-sage-800/50 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 premium-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Premium Quality</h3>
              <p className="text-sage-300 text-lg">Lab-tested, pesticide-free products with guaranteed potency</p>
            </div>
            <div 
              className="text-center p-10 rounded-2xl dark-glass backdrop-blur-sm border border-sage-800/50 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 premium-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Award-Winning</h3>
              <p className="text-sage-300 text-lg">Multiple Cannabis Cup winners and industry recognition</p>
            </div>
            <div 
              className="text-center p-10 rounded-2xl dark-glass backdrop-blur-sm border border-sage-800/50 transition-transform duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 premium-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Discreet Delivery</h3>
              <p className="text-sage-300 text-lg">Fast, secure, and confidential delivery service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section id="promotions" className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-white mb-6">Current Promotions</h2>
            <p className="text-xl text-sage-300">Exclusive offers for our valued members</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:scale-102"
              >
                <Card className="bg-sage-950/50 border-sage-800 backdrop-blur-sm h-full">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white font-display text-2xl">{promo.title}</CardTitle>
                      <Badge className="gold-gradient text-white font-semibold text-lg px-4 py-1">{promo.discount}</Badge>
                    </div>
                    <CardDescription className="text-sage-300 text-lg mt-4">{promo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-sage-400 mb-6">Valid until: {promo.validUntil}</p>
                    <Button className="w-full premium-gradient text-white font-semibold py-6 text-lg hover:scale-105 transition-transform duration-300">
                      Claim Offer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Growers */}
      <section id="growers" className="py-24 bg-sage-950 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-white mb-6">Master Growers</h2>
            <p className="text-xl text-sage-300">Expert cultivators dedicated to cannabis excellence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {growers.map((grower, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:scale-102"
              >
                <Card className="bg-black/50 border-sage-800 backdrop-blur-sm h-full">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 premium-gradient rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-white font-display text-2xl">{grower.name}</CardTitle>
                    <CardDescription className="text-forest-400 font-semibold text-lg mt-2">{grower.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sage-300 text-lg mb-6">{grower.experience} of experience</p>
                    <div className="space-y-3">
                      {grower.awards.map((award, awardIndex) => (
                        <Badge key={awardIndex} variant="outline" className="border-gold-600 text-gold-400 text-sm px-4 py-2">
                          <Star className="h-4 w-4 mr-2" />
                          {award}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid"></div>
        <div className="container mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-white mb-6">Our Story</h2>
              <p className="text-lg text-sage-300 mb-6 leading-relaxed">
                Founded by a collective of passionate cannabis cultivators, GreenCraft Collective represents the
                pinnacle of cannabis craftsmanship. Our team combines decades of growing experience with cutting-edge
                cultivation techniques.
              </p>
              <p className="text-lg text-sage-300 mb-6 leading-relaxed">
                We believe in sustainable practices, community education, and pushing the boundaries of what's possible
                in cannabis cultivation. Every product reflects our commitment to excellence.
              </p>
              <Button className="premium-gradient text-white font-semibold px-8 py-4 text-lg hover:scale-105 transition-transform duration-300">Learn More</Button>
            </div>
            <div className="dark-glass rounded-xl p-8 backdrop-blur-sm border border-sage-800/50">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-forest-400 mb-2">15+</div>
                  <div className="text-sage-300">Years Experience</div>
                </div>
                <div className="transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-gold-400 mb-2">50+</div>
                  <div className="text-sage-300">Awards Won</div>
                </div>
                <div className="transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-forest-400 mb-2">1000+</div>
                  <div className="text-sage-300">Happy Members</div>
                </div>
                <div className="transition-transform duration-300 hover:scale-105">
                  <div className="text-3xl font-bold text-gold-400 mb-2">100%</div>
                  <div className="text-sage-300">Organic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-950 text-white py-12 border-t border-sage-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-forest-500" />
                <span className="text-xl font-display font-bold">GreenCraft Collective</span>
              </div>
              <p className="text-sage-300">Premium cannabis products crafted with passion and expertise.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-forest-400">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Products
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Education
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Community
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-forest-400">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Shipping
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Returns
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-forest-400">Legal</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Age Verification
                </Link>
                <Link href="#" className="block text-sage-300 hover:text-white transition-colors">
                  Compliance
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-sage-800 mt-8 pt-8 text-center">
            <p className="text-sage-300">&copy; 2024 GreenCraft Collective. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-sage-950 border-sage-800">
            <CardHeader>
              <CardTitle className="text-white font-display">Join Members Area</CardTitle>
              <CardDescription className="text-sage-300">Access premium cannabis products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/signup">
                  <Button className="w-full premium-gradient text-white font-semibold">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
                <Button className="w-full" variant="outline" onClick={() => setIsSignupOpen(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        .bg-grid {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}
