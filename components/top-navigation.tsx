"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Hash, Bell, Mail, Search } from "lucide-react"

interface TopNavigationProps {
  onAccountClick: () => void
}

export function TopNavigation({ onAccountClick }: TopNavigationProps) {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Left Navigation Icons */}
        <div className="flex items-center space-x-8">
          <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-slate-800">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800">
            <Hash className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 hover:bg-slate-800">
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        {/* Center Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search Twitter"
              className="pl-10 bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right User Info */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-slate-200 hover:bg-slate-800"
            onClick={onAccountClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
              <AvatarFallback className="bg-slate-700 text-slate-200">{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:block font-medium">{session?.user?.name}</span>
          </Button>
          <div className="text-blue-400 font-medium hidden lg:block">Account info</div>
        </div>
      </div>
    </header>
  )
}
