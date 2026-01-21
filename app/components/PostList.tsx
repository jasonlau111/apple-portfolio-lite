'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface PostListProps {
    posts: {
        id: string;
        date: string;
        title: string;
        description: string;
        tags?: string[];
    }[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <div className="space-y-16">
            {posts.map(({ id, date, title, description, tags }, index) => (
                <motion.article
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                >
                    <Link href={`/blog/${id}`} className="block">
                        <div className="flex items-center gap-3 text-xs font-semibold mb-2 tracking-wide uppercase">
                            <span className="text-[hsl(270,60%,55%)]">{date}</span>
                            <span className="w-px h-3 bg-[#e5e5e5] dark:bg-[#333]"></span>
                            <span className="text-[hsl(270,60%,55%)]">{tags?.[0] || 'Note'}</span>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3 leading-tight group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
                            {title}
                        </h2>

                        <p className="text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed text-base line-clamp-2 group-hover:text-[#1d1d1f] dark:group-hover:text-white transition-colors">
                            {description}
                        </p>

                        <div className="mt-4 flex items-center text-[#0071E3] dark:text-[#2997FF] text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Read more →
                        </div>
                    </Link>
                </motion.article>
            ))}

            {posts.length === 0 && (
                <div className="py-20 text-center text-[#86868b]">
                    <p>No posts found.</p>
                </div>
            )}
        </div>
    );
}
