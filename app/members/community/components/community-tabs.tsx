import { Suspense } from "react"
import { CommunityClient } from "../community-client"

export function CommunityTabs() {
  return (
    <Suspense fallback={<div className="text-center text-sage-400 py-16">Loading community...</div>}>
      <CommunityClient />
    </Suspense>
  )
} 