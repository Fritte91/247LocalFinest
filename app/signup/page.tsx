"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Leaf, Shield, MapPin, User, Calendar, Phone, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    ageVerified: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }
  }

  const validateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {}

    // Validation
    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.address) newErrors.address = "Address is required"
    if (!formData.city) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode) newErrors.zipCode = "Zip code is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms"
    if (!formData.ageVerified) newErrors.ageVerified = "Age verification is required"

    // Age validation
    if (formData.dateOfBirth) {
      const age = validateAge(formData.dateOfBirth)
      if (age < 21) {
        newErrors.dateOfBirth = "You must be 21 or older to access our services"
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to sign up")
      }

      toast({
        title: "Success",
        description: "Account created successfully",
      })
      router.push("/signin")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-sage-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-forest-500" />
              <span className="text-2xl font-display font-bold text-white">247LocalFinest</span>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-800">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-sage-950 border-sage-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-display text-white">Join Our Members Area</CardTitle>
              <CardDescription className="text-lg text-sage-300">
                Access premium cannabis products and exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Age Verification Notice */}
              <div className="dark-glass rounded-lg p-6 mb-8 border border-gold-600/30">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-gold-500" />
                  <span className="font-semibold text-gold-400 text-lg">Age Verification Required</span>
                </div>
                <p className="text-sage-300">
                  You must be 21 years or older to access our cannabis products. We verify all member information for
                  compliance with local laws and regulations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-6 w-6 text-forest-500" />
                    <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sage-300 font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your first name"
                        disabled={isLoading}
                      />
                      {errors.firstName && <p className="text-red-400 text-sm mt-2">{errors.firstName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-sage-300 font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your last name"
                        disabled={isLoading}
                      />
                      {errors.lastName && <p className="text-red-400 text-sm mt-2">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sage-300 font-medium">
                        Email Address *
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`pl-12 bg-black border-sage-700 text-white h-12 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="your@email.com"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sage-300 font-medium">
                        Phone Number *
                      </Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`pl-12 bg-black border-sage-700 text-white h-12 ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                          placeholder="(555) 123-4567"
                          disabled={isLoading}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-sm mt-2">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="text-sage-300 font-medium">
                      Date of Birth *
                    </Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className={`pl-12 bg-black border-sage-700 text-white h-12 ${
                          errors.dateOfBirth ? "border-red-500" : ""
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.dateOfBirth && <p className="text-red-400 text-sm mt-2">{errors.dateOfBirth}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sage-300 font-medium">
                      Password *
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-12 bg-black border-sage-700 text-white h-12 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        placeholder="Create a password"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sage-300 font-medium">
                      Confirm Password *
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`pl-12 bg-black border-sage-700 text-white h-12 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                        placeholder="Confirm your password"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-2">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-forest-500" />
                    <h3 className="text-xl font-semibold text-white">Address Information</h3>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sage-300 font-medium">
                      Street Address *
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                        errors.address ? "border-red-500" : ""
                      }`}
                      placeholder="123 Main Street"
                      disabled={isLoading}
                    />
                    {errors.address && <p className="text-red-400 text-sm mt-2">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city" className="text-sage-300 font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                          errors.city ? "border-red-500" : ""
                        }`}
                        placeholder="City"
                        disabled={isLoading}
                      />
                      {errors.city && <p className="text-red-400 text-sm mt-2">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="state" className="text-sage-300 font-medium">
                        State *
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                          errors.state ? "border-red-500" : ""
                        }`}
                        placeholder="State"
                        disabled={isLoading}
                      />
                      {errors.state && <p className="text-red-400 text-sm mt-2">{errors.state}</p>}
                    </div>

                    <div>
                      <Label htmlFor="zipCode" className="text-sage-300 font-medium">
                        Zip Code *
                      </Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className={`mt-2 bg-black border-sage-700 text-white h-12 ${
                          errors.zipCode ? "border-red-500" : ""
                        }`}
                        placeholder="12345"
                        disabled={isLoading}
                      />
                      {errors.zipCode && <p className="text-red-400 text-sm mt-2">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Terms and Verification */}
                <div className="space-y-6">
                  <div className="dark-glass rounded-lg p-6 space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="ageVerified"
                        checked={formData.ageVerified}
                        onCheckedChange={(checked) => handleInputChange("ageVerified", checked)}
                        className="mt-1"
                        disabled={isLoading}
                      />
                      <Label htmlFor="ageVerified" className="text-sage-300 leading-relaxed">
                        I certify that I am 21 years of age or older and legally allowed to purchase cannabis products
                        in my jurisdiction. *
                      </Label>
                    </div>
                    {errors.ageVerified && <p className="text-red-400 text-sm">{errors.ageVerified}</p>}

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                        className="mt-1"
                        disabled={isLoading}
                      />
                      <Label htmlFor="agreeTerms" className="text-sage-300 leading-relaxed">
                        I agree to the{" "}
                        <Link href="#" className="text-forest-400 hover:text-forest-300 underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-forest-400 hover:text-forest-300 underline">
                          Privacy Policy
                        </Link>{" "}
                        *
                      </Label>
                    </div>
                    {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms}</p>}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full premium-gradient text-white py-4 text-lg font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account & Enter Members Area"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sage-300">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-forest-400 hover:text-forest-300 font-semibold underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
