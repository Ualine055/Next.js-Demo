import type React from "react"
import { BlogSidebar } from "@/components/blog-sidebar"

/**
 * NESTED LAYOUT FOR BLOG SECTION
 *
 * This layout wraps all blog pages and includes a sidebar
 * that is only visible in the blog section.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - visible only in blog section */}
        <aside className="lg:w-64 flex-shrink-0">
          <BlogSidebar />
        </aside>

        {/* Main content area */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  )
}
