import Link from "next/link";

export default function VocabularyBookCard({ book, largeTitle = false }) {
    const {
        id,
        name,
        desc,
        image,
        count,
    } = book;

    return (
        <Link
            href={`/vocabulary/${id}`}
            className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all h-full border-2 border-gray-200 dark:border-gray-700"
        >
            <div className="relative h-full w-full overflow-hidden">
                {/* 背景图片 */}
                <div 
                    className="absolute inset-0 bg-cover bg-center rounded-lg" 
                    style={{ backgroundImage: `url(${image})` }}
                />
                
                {/* 只保留一个轻微渐变以提高文本可读性 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                {/* 单词数量标签 */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {count}
                </div>

                {/* 卡片内容 - 使用更大字体 */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                    <div className={`${largeTitle ? 'text-3xl' : 'text-xl'} font-bold text-white mb-2 text-shadow`}>{name}</div>
                    {!largeTitle && (
                      <>
                        <p className="text-sm text-white/90 mb-2">{desc}</p>
                      </>
                    )}
                </div>
            </div>
        </Link>
    );
}