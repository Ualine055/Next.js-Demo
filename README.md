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

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
\`\`\`bash
git clone <your-repo-url>
cd nextjs-rendering-demo
\`\`\`

2. **Install dependencies**:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Run the development server**:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
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

## 🧪 Testing the Rendering Techniques

### Test CSR (Home Page)
1. Visit the home page
2. Watch the clock update every second
3. Open DevTools Network tab - no requests after initial load

### Test SSR (About Page)
1. Visit the about page
2. Note the timestamp at the bottom
3. Refresh the page - timestamp updates (new server render)

### Test SSG (Blog List)
1. Visit the blog page
2. Check Network tab - instant load (pre-rendered)
3. View page source - full HTML is present

### Test ISR (Blog Detail)
1. Visit any blog post
2. Refresh within 60 seconds - same cached version
3. Wait 60+ seconds and refresh - page regenerates

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 🚢 Deployment

This project is ready to deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click
4. Add the deployment URL to your GitHub repository's About section

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using Next.js 16 and the App Router
