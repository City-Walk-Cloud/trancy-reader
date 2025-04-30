import { BookText, Search, Filter, SlidersHorizontal } from "lucide-react";
import ReadingCard from "@/components/ReadingCard";

// 示例数据
const readingMaterials = [
  {
    id: "1",
    title: "旅行者的早晨",
    description: "在异国他乡的清晨，探索当地文化和语言的奇妙旅程。适合初学者的简单故事，配有重点词汇解释。",
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    level: "初级",
    readingTime: 5,
    category: "旅行",
    tags: ["简单", "对话", "日常"]
  },
  {
    id: "2",
    title: "咖啡馆的下午",
    description: "一篇关于咖啡文化的有趣阅读，学习与咖啡相关的词汇和表达方式，提高中级阅读理解能力。",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    level: "中级",
    readingTime: 10,
    category: "生活方式",
    tags: ["美食", "文化", "对话"]
  },
  {
    id: "3",
    title: "科技的未来",
    description: "探讨人工智能和自动化如何改变我们的生活和工作。这篇高级阅读材料包含专业术语和复杂句型。",
    coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
    level: "高级",
    readingTime: 15,
    category: "科技",
    tags: ["专业", "学术", "未来"]
  },
  {
    id: "4",
    title: "城市的夜晚",
    description: "通过这篇富有诗意的短文，了解不同文化中关于夜生活的表达和描述，提高你的形容词使用能力。",
    coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    level: "中级",
    readingTime: 8,
    category: "文化",
    tags: ["描述", "城市", "夜晚"]
  }
];

export default function ReadingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <BookText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">阅读材料</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索阅读材料..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </button>
          <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            <span>难度</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {readingMaterials.map((material) => (
          <ReadingCard key={material.id} reading={material} />
        ))}
      </div>
    </div>
  );
}
