import { LiveClock } from "@/components/live-clock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * HOME PAGE - Demonstrates Client-Side Rendering (CSR)
 *
 * This page uses a client component (LiveClock) that updates every second.
 * The clock demonstrates CSR because it requires browser APIs and real-time updates.
 */
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Next.js Rendering Techniques Demo
          </h1>
          <p className="text-xl text-muted-foreground">
            Exploring CSR, SSR, SSG, ISR, and Edge Rendering in Next.js 16
          </p>
        </div>

        {/* Live Clock - CSR Component */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Clock</CardTitle>
              <Badge variant="secondary">CSR - Client-Side Rendering</Badge>
            </div>
            <CardDescription>This component updates every second using client-side JavaScript</CardDescription>
          </CardHeader>
          <CardContent>
            <LiveClock />
          </CardContent>
        </Card>

        {/* Rendering Techniques Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🏠 Home Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong>CSR:</strong> Live clock component that updates in real-time using client-side rendering
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">👤 About Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong>SSR:</strong> Server-side rendering fetches fresh data on every request
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Blog List</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong>SSG:</strong> Static site generation builds pages at build time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📄 Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong>ISR:</strong> Incremental static regeneration updates pages periodically
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
