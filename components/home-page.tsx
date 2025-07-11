"use client"

import { useState } from "react"
import { TopNavigation } from "@/components/top-navigation"
import { LeftSidebar } from "@/components/left-sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"
import { AccountInfoPanel } from "@/components/account-info-panel"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function HomePage() {
  const [showAccountInfo, setShowAccountInfo] = useState(false)

  return (
    <div className="min-h-screen bg-slate-900">
      <TopNavigation onAccountClick={() => setShowAccountInfo(!showAccountInfo)} />

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-64 xl:w-80">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-slate-700">
          <MainContent />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 xl:w-96">
          <RightSidebar />
        </div>

        {/* Account Info Panel */}
        {showAccountInfo && (
          <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
            <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setShowAccountInfo(false)} />
            <div className="fixed right-0 top-0 h-full w-80 lg:relative lg:w-80">
              <AccountInfoPanel onClose={() => setShowAccountInfo(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Floating Post Button - Mobile */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg lg:hidden bg-blue-500 hover:bg-blue-600"
      >
        <Edit className="h-5 w-5" />
      </Button>
    </div>
  )
}
