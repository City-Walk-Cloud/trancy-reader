"use client";

import { useState, useEffect } from "react";
import { BookText, Search, Filter, SlidersHorizontal } from "lucide-react";
import ReadingCard from "@/components/ReadingCard";

export default function ReadingPage() {
  const [readingMaterials, setReadingMaterials] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showTagMenu, setShowTagMenu] = useState(false);
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [loading, setLoading] = useState(true); // 新增 loading 状态

  // 拉取数据
  useEffect(() => {
    setLoading(true); // 开始 loading
    fetch("/api/reading-materials")
      .then(res => res.json())
      .then(data => {
        // 处理 tags 字段为数组，兼容 {描述,城市,夜晚} 格式
        const normalized = data.map(item => ({
          ...item,
          tags: typeof item.tags === "string"
            ? item.tags.replace(/^{|}$/g, "").split(",").map(tag => tag.trim()).filter(Boolean)
            : Array.isArray(item.tags) ? item.tags : []
        }));
        setReadingMaterials(normalized);
        setAllTags(Array.from(new Set(normalized.flatMap(item => item.tags))));
      })
      .finally(() => setLoading(false)); // 结束 loading
  }, []);

  // 过滤逻辑
  const filteredMaterials = readingMaterials.filter((material) => {
    const matchSearch =
      !search ||
      material.title.includes(search) ||
      material.description.includes(search) ||
      material.tags.some(tag => tag.includes(search));
    const matchTag = !selectedTag || material.tags.includes(selectedTag);
    const matchLevel = !selectedLevel || material.level === selectedLevel;
    return matchSearch && matchTag && matchLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* loading 遮罩 */}
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
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <button
              className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowTagMenu(v => !v)}
              type="button"
            >
              <Filter className="h-4 w-4" />
              <span>标签</span>
            </button>
            {showTagMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                <div className="flex flex-wrap p-2 gap-2">
                  <button
                    className={`px-2 py-1 rounded text-xs ${selectedTag === "" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => { setSelectedTag(""); setShowTagMenu(false); }}
                  >
                    全部
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      className={`px-2 py-1 rounded text-xs ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                      onClick={() => { setSelectedTag(tag); setShowTagMenu(false); }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setShowLevelMenu(v => !v)}
              type="button"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>难度</span>
            </button>
            {showLevelMenu && (
              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                <div className="flex flex-col p-2 gap-2">
                  <button
                    className={`px-2 py-1 rounded text-xs ${selectedLevel === "" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                    onClick={() => { setSelectedLevel(""); setShowLevelMenu(false); }}
                  >
                    全部
                  </button>
                  {["初级", "中级", "高级"].map(level => (
                    <button
                      key={level}
                      className={`px-2 py-1 rounded text-xs ${selectedLevel === level ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}
                      onClick={() => { setSelectedLevel(level); setShowLevelMenu(false); }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 卡片区域加 loading 遮罩 */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-30 rounded-lg">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-gray-700 dark:text-gray-200">加载中...</span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaterials.map((material) => (
            <ReadingCard key={material.id} reading={material} />
          ))}
        </div>
        {filteredMaterials.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">没有符合条件的阅读材料</div>
        )}
      </div>
    </div>
  );
}
