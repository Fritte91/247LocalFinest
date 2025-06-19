import { Leaf } from "lucide-react"

interface GreenCraftLogoProps {
  className?: string
}

export function GreenCraftLogo({ className }: GreenCraftLogoProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-forest-400 to-forest-600 rounded-lg blur-sm opacity-50" />
      <div className="relative bg-gradient-to-br from-forest-500 to-forest-700 rounded-lg p-2">
        <Leaf className="text-white" />
      </div>
    </div>
  )
} 