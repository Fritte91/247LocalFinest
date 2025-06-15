"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Ruler } from "lucide-react"

export function SizeGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-sage-600 text-sage-300 hover:bg-sage-900">
          <Ruler className="h-4 w-4 mr-2" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-sage-950 border-sage-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Glassware Size Guide</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-sage-900/30 rounded-lg p-4 border border-sage-800/50">
            <h3 className="text-lg font-semibold text-white mb-3">Standard Sizes</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sage-300">Small</span>
                <span className="text-white">4-6 inches</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sage-300">Medium</span>
                <span className="text-white">6-10 inches</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sage-300">Large</span>
                <span className="text-white">10+ inches</span>
              </div>
            </div>
          </div>
          
          <div className="bg-sage-900/30 rounded-lg p-4 border border-sage-800/50">
            <h3 className="text-lg font-semibold text-white mb-3">Product Types</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-forest-400 font-medium mb-2">Bongs</h4>
                <p className="text-sage-300 text-sm">Typically range from 8-18 inches in height</p>
              </div>
              <div>
                <h4 className="text-forest-400 font-medium mb-2">Pipes</h4>
                <p className="text-sage-300 text-sm">Usually 4-8 inches in length</p>
              </div>
              <div>
                <h4 className="text-forest-400 font-medium mb-2">Accessories</h4>
                <p className="text-sage-300 text-sm">Varies by product type</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-sage-400">
            * All measurements are approximate and may vary slightly. Please refer to the product description for exact dimensions.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
} 