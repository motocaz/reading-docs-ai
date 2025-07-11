"use client"

import { Star } from "lucide-react"

export function LeftSidebar() {
  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] p-4">
      <div className="flex items-center space-x-3 text-slate-200">
        <h1 className="text-xl font-bold">Home</h1>
        <Star className="h-5 w-5 text-slate-400" />
      </div>
    </div>
  )
}
