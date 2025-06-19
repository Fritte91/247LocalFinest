import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  isActive?: boolean
  children: React.ReactNode
  className?: string
}

export function ThemedButton({
  variant = "outline",
  size = "default",
  isActive = false,
  children,
  className,
  ...props
}: ThemedButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        isActive
          ? "premium-gradient text-white font-medium shadow-lg shadow-forest-900/20"
          : "bg-sage-900 border-forest-500 text-forest-400 hover:bg-forest-900/50 hover:text-forest-300",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
} 