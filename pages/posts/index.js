import AllPosts from "../../components/posts/all-posts"

const DUMMY_POSTS = [
  {
    slug: 'getting-started-nextjs',
    title: 'Get Started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next.js is a React framework for production. It makes building web applications and sites easy.',
    date: '2026-01-01'
  },
  {
    slug: 'top-5-next-features',
    title: 'Top 5 Next.js Features',
    image: 'top-5-next-features.jpg',
    excerpt: 'Next.js top features that you should know about as a React developer. Next.js is a React framework for production.',
    date: '2026-01-02'
  },
  {
    slug: 'next-js-api-routes',
    title: 'Next.js API Routes',
    image: 'next-js-api-routes.png',
    excerpt: 'API routes provide a solution to build your API with Next.js. API routes are located in the pages/api directory.',
    date: '2026-01-03'
  },
  {
    slug: 'next-js-app-router-vs-page-router',
    title: 'Next.js App Router vs Page Router',
    image: 'next-js-app-router-vs-page-router.webp',
    excerpt: 'A comparison between Next.js App Router and Page Router. Learn the differences and when to use each.',
    date: '2026-01-04'
  },
]

const AllPostsPage = () => {
  return (
      <AllPosts posts={DUMMY_POSTS} />
  )
}

export default AllPostsPage