import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, UserIcon } from "lucide-react"

/**
 * BLOG DETAIL PAGE - Demonstrates Incremental Static Regeneration (ISR)
 *
 * This page uses ISR because:
 * 1. It's statically generated at build time
 * 2. It automatically regenerates after a specified time (60 seconds)
 * 3. Combines benefits of SSG (speed) with SSR (fresh data)
 * 4. Uses revalidate option in fetch
 */

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Author = {
  id: number
  name: string
  username: string
  email: string
}

async function getPost(id: string): Promise<Post | null> {
  // ISR: Revalidate every 60 seconds
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 }, // This makes it ISR - regenerates every 60 seconds
  })

  if (!res.ok) {
    return null
  }

  return res.json()
}

async function getAuthor(userId: number): Promise<Author> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch author")
  }

  return res.json()
}

// Generate static params for the first 10 posts at build time
export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json())

  // Generate paths for first 10 posts
  return posts.slice(0, 10).map((post: Post) => ({
    id: post.id.toString(),
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const author = await getAuthor(post.userId)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <Badge variant="secondary">ISR - Incremental Static Regeneration</Badge>
        <h1 className="text-4xl font-bold tracking-tight leading-tight">{post.title}</h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-2">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author.username}`} />
            <AvatarFallback>
              {author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{author.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Published on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
          <CardDescription>Post ID: {post.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed">{post.body}</p>
          </div>
        </CardContent>
      </Card>

      {/* Author Details */}
      <Card>
        <CardHeader>
          <CardTitle>About the Author</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Name:</strong> {author.name}
            </p>
            <p className="text-sm">
              <strong>Username:</strong> @{author.username}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {author.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ISR Explanation */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Why ISR?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            This page uses Incremental Static Regeneration (ISR) with{" "}
            <code className="bg-muted px-1 py-0.5 rounded">revalidate: 60</code>. The page is statically generated at
            build time, but automatically regenerates every 60 seconds when requested.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Benefits:</strong> Fast static page delivery with automatic updates. You get the speed of SSG with
            the freshness of SSR, without rebuilding the entire site.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Try it:</strong> Refresh this page multiple times within 60 seconds - you'll see the same cached
            version. Wait 60+ seconds and refresh - the page will regenerate with fresh data.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
