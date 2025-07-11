"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { X, Plus, User, FileText, Bookmark, Megaphone, BarChart3, Settings, HelpCircle, LogOut } from "lucide-react"

interface AccountInfoPanelProps {
  onClose: () => void
}

export function AccountInfoPanel({ onClose }: AccountInfoPanelProps) {
  const { data: session } = useSession()

  const menuItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: FileText, label: "Lists", href: "/lists" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: Megaphone, label: "Ads", href: "/ads" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ]

  return (
    <div className="h-full bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-slate-200">Account info</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-blue-400 hover:bg-slate-700">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback className="bg-slate-700 text-slate-200">{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-slate-700">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-slate-200">{session?.user?.name}</h3>
          <p className="text-slate-500">@{session?.user?.email || "username"}</p>
        </div>

        <div className="flex items-center space-x-6 mt-3 text-sm">
          <span className="text-slate-200">
            <strong>711</strong> <span className="text-slate-500">Following</span>
          </span>
          <span className="text-slate-200">
            <strong>7.5K</strong> <span className="text-slate-500">Followers</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start px-4 py-3 text-slate-200 hover:bg-slate-700"
          >
            <item.icon className="h-5 w-5 mr-3 text-slate-400" />
            {item.label}
          </Button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 p-4 space-y-4">
        <Button variant="ghost" className="w-full justify-start px-0 text-slate-200 hover:bg-slate-700">
          <Settings className="h-5 w-5 mr-3 text-slate-400" />
          Settings and privacy
        </Button>

        <Button variant="ghost" className="w-full justify-start px-0 text-slate-200 hover:bg-slate-700">
          <HelpCircle className="h-5 w-5 mr-3 text-slate-400" />
          Help Center
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start px-0 text-slate-200 hover:bg-slate-700"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-3 text-slate-400" />
          Log out
        </Button>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <span className="text-slate-200">Dark Mode</span>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}
