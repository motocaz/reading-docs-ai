"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Repeat2, Heart, Share, File } from "lucide-react"

interface Attachment {
  id: string
  name: string
  type: 'image' | 'file'
  url: string
}

interface PostMainProps {
  post: {
    id: string
    user: {
      name: string
      username: string
      avatar: string
      verified?: boolean
    }
    content: string
    attachments?: Attachment[]
    timestamp: string
    likes: number
    retweets: number
    replies: number
  }
}

export function PostMain({ post }: PostMainProps) {
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)
  const [isNew, setIsNew] = useState(post.timestamp === "now")
  const [likeCount, setLikeCount] = useState(post.likes)
  const [retweetCount, setRetweetCount] = useState(post.retweets)

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsNew(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  useEffect(() => {
    setLikeCount(post.likes + (liked ? 1 : 0))
    setRetweetCount(post.retweets + (retweeted ? 1 : 0))
  }, [liked, retweeted, post.likes, post.retweets])

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleRetweet = () => {
    setRetweeted(!retweeted)
  }

  return (
    <div
      className={`border-b border-slate-700 p-4 hover:bg-slate-900/50 transition-all duration-300 ${isNew ? "bg-blue-500/5 border-blue-500/20" : ""
        }`}
    >
      <div className="flex space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
          <AvatarFallback className="bg-slate-700 text-slate-200">
            {post.user.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-bold text-slate-200">{post.user.name}</span>
            {post.user.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            )}
            <span className="text-slate-500">@{post.user.username}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-500">{post.timestamp}</span>
            {isNew && <span className="text-blue-400 text-sm font-medium">New</span>}
          </div>

          <p className="text-slate-200 mb-3 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>

          {/* Exibição de anexos */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-2">
                {post.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="relative rounded-xl overflow-hidden border border-slate-700"
                  >
                    {attachment.type === 'image' ? (
                      <div className="aspect-video bg-slate-800">
                        <Image
                          src={attachment.url}
                          alt={attachment.name}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-slate-800">
                        <File className="h-5 w-5 text-blue-400 mr-2" />
                        <div className="truncate text-sm text-slate-300">
                          {attachment.name}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between max-w-md">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-full p-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.replies}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 rounded-full p-2 ${retweeted
                ? "text-green-400 hover:bg-green-400/10"
                : "text-slate-500 hover:text-green-400 hover:bg-green-400/10"
                }`}
              onClick={handleRetweet}
            >
              <Repeat2 className="h-5 w-5" />
              <span className="text-sm">{retweetCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-2 rounded-full p-2 ${liked
                ? "text-red-500 hover:bg-red-500/10"
                : "text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span className="text-sm">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-full p-2"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}