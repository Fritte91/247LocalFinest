import { CommunityClient } from "./community-client";
import { CommunityHeaderWithMobileNav } from "./components/community-header";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <CommunityHeaderWithMobileNav />
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">Community Hub</h1>
          <p className="text-base md:text-xl text-sage-300 px-4">
            Connect, learn, and grow with fellow cannabis enthusiasts
          </p>
        </div>
        <CommunityClient />
      </div>
    </div>
  );
}
