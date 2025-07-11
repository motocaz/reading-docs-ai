"use client"

import { WhoToFollowMain } from "@/components/who-to-follow-main"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function RightSidebar() {
  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] p-4 space-y-6">
      <WhoToFollowMain />

      {/* Footer Links */}
      <div className="text-sm text-slate-500 space-y-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy policy
          </a>
          <a href="#" className="hover:underline">
            Cookies
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            More
          </a>
        </div>
      </div>

      {/* Post Button */}
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full">
        <Edit className="h-5 w-5 mr-2" />
        Post
      </Button>
    </div>
  )
}
