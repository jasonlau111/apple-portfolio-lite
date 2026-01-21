export default function CategoryList({ tags }: { tags: string[] }) {
    // Deduplicate tags
    const uniqueTags = Array.from(new Set(tags)).sort();

    return (
        <div className="p-6 bg-white dark:bg-[#1c1c1e] rounded-3xl shadow-sm border border-black/5 dark:border-white/5 transition-colors sticky top-24">
            <h3 className="text-xs font-bold text-[hsl(270,60%,55%)] uppercase tracking-wider mb-4 pl-1">
                Topics
            </h3>
            <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[hsl(145,50%,95%)] dark:bg-[hsl(145,30%,20%)] text-[hsl(145,55%,40%)] dark:text-[hsl(145,60%,60%)] hover:bg-[hsl(145,50%,90%)] dark:hover:bg-[hsl(145,30%,25%)] transition-colors cursor-pointer">
                        #{tag}
                    </span>
                ))}
                {uniqueTags.length === 0 && (
                    <span className="text-xs text-[#86868b]">No tags yet.</span>
                )}
            </div>
        </div>
    );
}
