import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

/**
 * BLOG LIST PAGE - Demonstrates Static Site Generation (SSG)
 *
 * This page uses SSG because:
 * 1. It fetches data at build time
 * 2. The page is pre-rendered as static HTML
 * 3. Uses fetch with default caching (force-cache)
 * 4. Perfect for content that doesn't change frequently
 */

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

async function getPosts(): Promise<Post[]> {
  // SSG: Default fetch behavior caches at build time
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache", // This makes it SSG - cached at build time
  })

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  const posts = await res.json()
  // Return first 12 posts for demo
  return posts.slice(0, 12)
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <Badge variant="secondary">SSG - Static Site Generation</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Blog Posts</h1>
        <p className="text-lg text-muted-foreground">
          This page is statically generated at build time for optimal performance
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>
                <CardDescription>Post #{post.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{post.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* SSG Explanation */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Why SSG?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            This page uses Static Site Generation (SSG) with{" "}
            <code className="bg-muted px-1 py-0.5 rounded">cache: 'force-cache'</code>. The blog posts are fetched once
            at build time and served as static HTML.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Benefits:</strong> Lightning-fast page loads, reduced server load, and excellent SEO. Perfect for
            content that doesn't change frequently.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
