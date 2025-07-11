"use client"

import { useState } from "react"
import { PostMain } from "@/components/post-main"
import { Button } from "@/components/ui/button"

const initialMockPosts = [
  {
    id: "1",
    user: {
      name: "Helen Brown",
      username: "helenbrown",
      avatar: "/placeholder.svg?height=48&width=48",
      verified: true,
    },
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Optio velit officia soluta quae nisl ipsa vitae, magni dignissimos sunt recusandae!",
    image: "/placeholder.svg?height=400&width=600",
    timestamp: "15m",
    likes: 24,
    retweets: 5,
    replies: 3,
  },
  {
    id: "2",
    user: {
      name: "Jane Doe",
      username: "janedoe",
      avatar: "/placeholder.svg?height=48&width=48",
      verified: true,
    },
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Optio velit officia soluta quae nisl ipsa vitae, magni dignissimos sunt recusandae!",
    image: "/placeholder.svg?height=350&width=600",
    timestamp: "35m",
    likes: 12,
    retweets: 2,
    replies: 1,
  },
]

interface TimelineMainProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newPosts: any[]
}

export function TimelineMain({ newPosts }: TimelineMainProps) {
  const [showAllPosts, setShowAllPosts] = useState(false)

  const allPosts = [...newPosts, ...initialMockPosts]
  const displayedPosts = showAllPosts ? allPosts : allPosts.slice(0, 5)
  const remainingCount = allPosts.length - displayedPosts.length

  return (
    <div>
      {displayedPosts.map((post) => (
        <PostMain key={post.id} post={post} />
      ))}

      {remainingCount > 0 && (
        <div className="border-b border-slate-700 p-4 text-center">
          <Button
            variant="ghost"
            onClick={() => setShowAllPosts(true)}
            className="text-blue-400 hover:bg-slate-800 hover:text-blue-300"
          >
            Show {remainingCount} more posts
          </Button>
        </div>
      )}
    </div>
  )
}
