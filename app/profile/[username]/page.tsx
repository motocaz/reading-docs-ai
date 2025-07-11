"use client"

import { useParams } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, LinkIcon } from "lucide-react"
import { PostMain } from "@/components/post-main"

const mockUserPosts = [
  {
    id: "1",
    user: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Working on some exciting new features for our social media platform! Can't wait to share them with everyone. 🚀",
    timestamp: "2h",
    likes: 15,
    retweets: 3,
    replies: 2,
  },
]

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
          <CardContent className="p-6">
            <div className="flex items-start justify-between -mt-16 mb-4">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Jane Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Jane Smith</h1>
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              </div>
              <p className="text-muted-foreground">@{username}</p>
              <p className="text-foreground">
                Software developer passionate about creating amazing user experiences. Love to share thoughts on tech,
                design, and life.
              </p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <span className="text-primary">janesmith.dev</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2020</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <span>
                  <strong>711</strong> Following
                </span>
                <span>
                  <strong>7.5K</strong> Followers
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="replies">Replies</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-4 mt-6">
              {mockUserPosts.map((post) => (
                <PostMain key={post.id} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="replies" className="mt-6">
              <p className="text-center text-muted-foreground py-8">No replies yet</p>
            </TabsContent>
            <TabsContent value="media" className="mt-6">
              <p className="text-center text-muted-foreground py-8">No media yet</p>
            </TabsContent>
            <TabsContent value="likes" className="mt-6">
              <p className="text-center text-muted-foreground py-8">No likes yet</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
