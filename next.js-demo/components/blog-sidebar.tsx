"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

/**
 * BLOG SIDEBAR - Demonstrates CSR for search functionality
 *
 * This component uses client-side rendering for:
 * 1. Interactive search input
 * 2. Real-time filtering
 * 3. Local state management
 */

const categories = [
  { name: "Tech", count: 25, color: "bg-blue-500" },
  { name: "Lifestyle", count: 18, color: "bg-green-500" },
  { name: "Education", count: 12, color: "bg-purple-500" },
  { name: "Business", count: 15, color: "bg-orange-500" },
  { name: "Travel", count: 8, color: "bg-pink-500" },
]

export function BlogSidebar() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 sticky top-20">
      {/* Search Feature - CSR */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground mt-2">
              Found {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No categories found</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About This Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Exploring various topics in technology, lifestyle, education, and more. All posts are fetched using
            different Next.js rendering techniques.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
