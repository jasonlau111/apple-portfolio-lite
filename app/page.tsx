import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import PostList from './components/PostList';
import ThemeToggle from './components/ThemeToggle';
import ActivityClock from './components/ActivityClock';
import ProfileCard from './components/ProfileCard';
import CategoryList from './components/CategoryList';

export const dynamic = 'force-dynamic';

export default function Home() {
  const allPostsData = getSortedPostsData();

  // Extract all tags for the sidebar
  const allTags = allPostsData.reduce<string[]>((acc, post) => {
    return acc.concat(post.tags || []);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-black text-[#1D1D1F] dark:text-[#F5F5F7] font-sans selection:bg-[#0071E3] selection:text-white transition-colors duration-500">
      {/* Gradient Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-[hsl(270,70%,60%)] via-[hsl(200,80%,55%)] to-[hsl(145,60%,50%)]" />

      {/* Navigation */}
      <nav className="fixed top-[3px] w-full bg-[#FFFFFF]/80 dark:bg-black/70 backdrop-blur-xl z-50 border-b border-[#e5e5e5] dark:border-[#333] transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Jason.
          </Link>
          <div className="flex gap-6 items-center text-xs text-[#86868b] font-medium">
            <Link href="/" className="text-[#1D1D1F] dark:text-white hidden md:block">Writing</Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content Grid */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

          {/* Left Column: Profile & Clock */}
          <aside className="md:col-span-3 hidden md:block">
            {/* Profile Card - Not Sticky */}
            <ProfileCard />

            {/* Clock - Sticky, with extra margin from profile */}
            <div className="mt-32 sticky top-28">
              <div className="flex justify-center">
                <ActivityClock />
              </div>
            </div>
          </aside>

          {/* Middle Column: Feed */}
          <section className="md:col-span-6 ">
            {/* Mobile Header (Only visible on small screens) */}
            <header className="mb-12 md:hidden">
              <h1 className="text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-2">
                Thinking in <span className="text-[#86868b]">Public.</span>
              </h1>
            </header>

            {/* Desktop Header Text (Optional, minimal) */}
            <div className="hidden md:block mb-10">
              <h1 className="text-2xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">Latest</h1>
            </div>

            <div className="bg-white dark:bg-[#1c1c1e] rounded-[2rem] p-6 sm:p-10 shadow-sm border border-black/5 dark:border-white/5 min-h-[500px]">
              <PostList posts={allPostsData} />
            </div>
          </section>

          {/* Right Column: Categories (Sticky) */}
          <aside className="md:col-span-3 hidden md:block h-fit sticky top-24">
            <CategoryList tags={allTags} />
          </aside>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] dark:border-[#333] mt-20 bg-white dark:bg-black">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex justify-between items-center text-xs text-[#86868b]">
          <p>© 2026 Jason.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-[#1D1D1F] dark:hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
