"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const suggestedUsers = [
  {
    id: "1",
    name: "Ann Smith",
    username: "annsmith",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Nick Doe",
    username: "nickdoe",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "James Black",
    username: "jamesblack",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function WhoToFollowMain() {
  const [following, setFollowing] = useState<Set<string>>(new Set())

  const toggleFollow = (userId: string) => {
    const newFollowing = new Set(following)
    if (newFollowing.has(userId)) {
      newFollowing.delete(userId)
    } else {
      newFollowing.add(userId)
    }
    setFollowing(newFollowing)
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <h2 className="text-xl font-bold text-slate-200 mb-4">Who to follow</h2>

      <div className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-slate-700 text-slate-200">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-slate-200">{user.name}</p>
                <p className="text-sm text-slate-500">@{user.username}</p>
              </div>
            </div>
            <Button
              variant={following.has(user.id) ? "outline" : "default"}
              size="sm"
              className={
                following.has(user.id)
                  ? "border-slate-600 text-slate-200 hover:bg-slate-700"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }
              onClick={() => toggleFollow(user.id)}
            >
              {following.has(user.id) ? "Following" : "Follow"}
            </Button>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-blue-400 hover:bg-slate-700">
          Show more
        </Button>
      </div>
    </div>
  )
}
