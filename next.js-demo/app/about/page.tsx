import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, MapPin, Phone, Globe } from "lucide-react"

/**
 * ABOUT PAGE - Demonstrates Server-Side Rendering (SSR)
 *
 * This page uses SSR because:
 * 1. It fetches data on every request (no caching)
 * 2. Data is always fresh and up-to-date
 * 3. The page is rendered on the server for each request
 * 4. Uses fetch with cache: 'no-store' to prevent caching
 */

type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
  }
}

async function getAuthorInfo(): Promise<User> {
  // SSR: Fetch with no-store ensures fresh data on every request
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store", // This makes it SSR - no caching
  })

  if (!res.ok) {
    throw new Error("Failed to fetch author info")
  }

  return res.json()
}

export default async function AboutPage() {
  // Fetch author data on the server for every request
  const author = await getAuthorInfo()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="mb-2">
            SSR - Server-Side Rendering
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">About the Author</h1>
          <p className="text-lg text-muted-foreground">
            This page is rendered on the server for every request, ensuring fresh data
          </p>
        </div>

        {/* Author Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author.username}`} />
                <AvatarFallback>
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{author.name}</CardTitle>
                <CardDescription className="text-base">@{author.username}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Contact Information</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{author.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{author.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{author.website}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {author.address.suite}, {author.address.street}, {author.address.city} {author.address.zipcode}
                  </span>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Company</h3>
              <div className="space-y-2">
                <p className="font-medium">{author.company.name}</p>
                <p className="text-sm text-muted-foreground italic">"{author.company.catchPhrase}"</p>
              </div>
            </div>

            {/* SSR Explanation */}
            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg mb-2">Why SSR?</h3>
              <p className="text-sm text-muted-foreground">
                This page uses Server-Side Rendering (SSR) with{" "}
                <code className="bg-muted px-1 py-0.5 rounded">cache: 'no-store'</code>. Every time you visit this page,
                the data is fetched fresh from the API on the server. This ensures you always see the most up-to-date
                information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timestamp */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              Page rendered at: <strong>{new Date().toLocaleString()}</strong>
            </p>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Refresh the page to see the timestamp update (proving SSR)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
