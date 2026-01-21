import { getPostData } from '../../../lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export const dynamic = 'force-dynamic';

// Next.js 15+ Params is a Promise
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    const postData = getPostData(decodedId);

    return (
        <div className="min-h-screen bg-[#F5F5F7] dark:bg-black transition-colors duration-300">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-[#fbfbfd]/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-[#d2d2d7]/30 dark:border-[#333] transition-all duration-300">
                <div className="max-w-2xl mx-auto px-6 h-12 flex items-center justify-between">
                    <Link href="/" className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity flex items-center gap-1 text-[#1D1D1F] dark:text-[#F5F5F7]">
                        <span className="text-lg pb-0.5">←</span> Back
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-[#86868b] uppercase tracking-wide hidden md:block">Jason's Blog</span>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <article className="max-w-2xl mx-auto px-6 pt-32 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="text-xs font-semibold text-[hsl(270,60%,55%)] mb-4 uppercase tracking-wider">
                        {postData.date}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-6 leading-[1.1]">
                        {postData.title}
                    </h1>
                    {postData.tags && (
                        <div className="flex justify-center gap-2">
                            {postData.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[hsl(145,50%,95%)] dark:bg-[hsl(145,30%,20%)] text-[hsl(145,55%,40%)] dark:text-[hsl(145,60%,60%)]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Content Divider */}
                <hr className="border-[#d2d2d7]/40 dark:border-[#333] mb-10 w-12 mx-auto" />

                {/* Markdown Content - DARK MODE PROSE */}
                <div className="prose prose-neutral dark:prose-invert max-w-none 
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#1D1D1F] dark:prose-headings:text-white
          prose-p:text-[#333336] dark:prose-p:text-[#a1a1a6] prose-p:leading-relaxed prose-p:text-[17px]
          prose-a:text-[#0071E3] dark:prose-a:text-[#2997FF] prose-a:no-underline hover:prose-a:underline 
          prose-img:rounded-2xl prose-img:shadow-sm
          prose-code:text-[#D5358F] dark:prose-code:text-[#ff375f] prose-code:bg-[#F5F5F7] dark:prose-code:bg-[#1c1c1e] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal prose-code:text-sm
          prose-li:text-[#333336] dark:prose-li:text-[#a1a1a6]
          prose-strong:text-[#1D1D1F] dark:prose-strong:text-white prose-strong:font-semibold
        ">
                    <ReactMarkdown>
                        {postData.content || ''}
                    </ReactMarkdown>
                </div>
            </article>

            {/* Footer */}
            <footer className="max-w-2xl mx-auto px-6 pb-20 text-center">
                <Link href="/" className="text-sm text-[#86868b] hover:text-[#1D1D1F] dark:hover:text-white transition-colors border-b border-transparent hover:border-[#1D1D1F] dark:hover:border-white">
                    Return home
                </Link>
            </footer>
        </div>
    );
}
