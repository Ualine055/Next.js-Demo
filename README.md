# Next.js Rendering Techniques Demo

A comprehensive demonstration of Next.js 16 App Router rendering techniques including Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).

## 🚀 Features

- **Client-Side Rendering (CSR)**: Live clock component that updates every second
- **Server-Side Rendering (SSR)**: About page with fresh data on every request
- **Static Site Generation (SSG)**: Blog list page pre-rendered at build time
- **Incremental Static Regeneration (ISR)**: Blog detail pages that regenerate every 60 seconds
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Nested Layouts**: Blog section with dedicated sidebar layout
- **Search Functionality**: Client-side category search in blog sidebar
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

\`\`\`
app/
├── layout.tsx              # Root layout with header and footer
├── page.tsx                # Home page (CSR demo)
├── about/
│   └── page.tsx           # About page (SSR demo)
└── blog/
    ├── layout.tsx         # Nested blog layout with sidebar
    ├── page.tsx           # Blog list (SSG demo)
    └── [id]/
        └── page.tsx       # Blog detail (ISR demo)

components/
├── header.tsx             # Navigation header with theme toggle
├── footer.tsx             # Site footer
├── theme-provider.tsx     # Theme context provider
├── live-clock.tsx         # CSR clock component
├── blog-sidebar.tsx       # Blog sidebar with search
└── ui/                    # shadcn/ui components
\`\`\`

## 🎯 Rendering Techniques Explained

### 1. Client-Side Rendering (CSR)
**Location**: Home page (`app/page.tsx`) - Live Clock component

**How it works**:
- Uses `'use client'` directive
- Renders in the browser using JavaScript
- Updates dynamically without server interaction
- Perfect for interactive, real-time features

**Code example**:
\`\`\`tsx
'use client'
export function LiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])
  // ...
}
\`\`\`

### 2. Server-Side Rendering (SSR)
**Location**: About page (`app/about/page.tsx`)

**How it works**:
- Fetches data on every request
- Renders on the server for each page load
- Always shows fresh, up-to-date data
- Uses `cache: 'no-store'` in fetch

**Code example**:
\`\`\`tsx
async function getAuthorInfo() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/1', {
    cache: 'no-store' // Forces SSR
  })
  return res.json()
}
\`\`\`

### 3. Static Site Generation (SSG)
**Location**: Blog list page (`app/blog/page.tsx`)

**How it works**:
- Pre-renders pages at build time
- Serves static HTML for lightning-fast loads
- Perfect for content that doesn't change often
- Uses `cache: 'force-cache'` (default)

**Code example**:
\`\`\`tsx
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache' // SSG - cached at build time
  })
  return res.json()
}
\`\`\`

### 4. Incremental Static Regeneration (ISR)
**Location**: Blog detail pages (`app/blog/[id]/page.tsx`)

**How it works**:
- Statically generated at build time
- Automatically regenerates after specified time
- Combines speed of SSG with freshness of SSR
- Uses `next: { revalidate: 60 }`

**Code example**:
\`\`\`tsx
async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 } // ISR - regenerates every 60 seconds
  })
  return res.json()
}
\`\`\`




## 🎨 Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

## 📝 Key Features Breakdown

### Dark/Light Mode Toggle
- Implemented using React Context
- Persists preference in localStorage
- Smooth transitions between themes
- Accessible with keyboard navigation

### Nested Layouts
- Root layout: Header, footer, and theme provider
- Blog layout: Adds sidebar only for blog section
- Demonstrates layout composition in App Router

### Search Functionality
- Client-side filtering of categories
- Real-time search results
- Demonstrates CSR for interactive features

## 🚢 Deployment

![Deploy with Vercel](next-js-demo-4x2r14uom-ualine055-5515s-projects.vercel.app)

## Github Repository Link
![Github link](https://github.com/Ualine055/Next.js-Demo.git)