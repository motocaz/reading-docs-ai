"use client"

import { useState } from "react"
import { PostComposerMain } from "@/components/post-composer-main"
import { TimelineMain } from "@/components/timeline-main"

export function MainContent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newPosts, setNewPosts] = useState<any[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNewPost = (post: any) => {
    setNewPosts((prev) => [post, ...prev])
  }

  return (
    <div className="min-h-screen">
      <PostComposerMain onNewPost={handleNewPost} />
      <TimelineMain newPosts={newPosts} />
    </div>
  )
}
