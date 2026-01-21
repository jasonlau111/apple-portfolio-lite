import Image from 'next/image';

export default function ProfileCard() {
    return (
        <div className="flex flex-col items-center p-6 bg-white dark:bg-[#1c1c1e] rounded-3xl shadow-sm border border-black/5 dark:border-white/5 transition-colors">
            {/* Avatar Image */}
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5 dark:ring-white/10">
                <Image
                    src="/avatar.jpg"
                    alt="Jason"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Gradient Name */}
            <h2 className="text-xl font-bold mb-1 bg-gradient-to-r from-[hsl(270,70%,55%)] to-[hsl(200,80%,50%)] bg-clip-text text-transparent">
                Jason
            </h2>

            <p className="text-sm text-[#86868b] text-center leading-relaxed">
                Digital Craftsman.<br />
                Building <span className="text-[hsl(200,70%,50%)] font-medium">bits</span> & <span className="text-[hsl(270,60%,55%)] font-medium">bytes</span>.
            </p>
        </div>
    );
}
