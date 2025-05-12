"use client";

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import VocabularyCarousel from "@/components/VocabularyCarousel";

export default function VocabularyPage() {
  // 各考试词书卡片数据
  const vocabBooks = [
    { 
      id: "cet4", 
      name: "四级词汇", 
      desc: "CET-4 高频核心词", 
      // 更好适配竖版比例的书籍封面图
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=900&q=80", 
      count: "2500词",
      level: "中级",
      tags: ["考试", "英语四级"]
    },
    { 
      id: "cet6", 
      name: "六级词汇", 
      desc: "CET-6 高频核心词", 
      // 更好适配竖版比例的书籍封面图
      image: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&w=600&h=900&q=80", 
      count: "2000词",
      level: "中高级",
      tags: ["考试", "英语六级"]
    },
    { 
      id: "kaoyan", 
      name: "考研词汇", 
      desc: "考研英语大纲词汇", 
      // 更好适配竖版比例的书籍封面图
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=900&q=80", 
      count: "5500词",
      level: "高级",
      tags: ["考试", "考研"]
    },
    { 
      id: "ielts", 
      name: "雅思词汇", 
      desc: "IELTS 必备词汇", 
      // 更好适配竖版比例的书籍封面图
      image: "https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?auto=format&fit=crop&w=600&h=900&q=80", 
      count: "4000词",
      level: "高级",
      tags: ["考试", "雅思"]
    },
    { 
      id: "toefl", 
      name: "托福词汇", 
      desc: "TOEFL 必备词汇", 
      // 更好适配竖版比例的书籍封面图
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=600&h=900&q=80", 
      count: "3500词",
      level: "高级",
      tags: ["考试", "托福"]
    }
  ];
  
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // 默认为加载中状态

  // 简化后的过滤逻辑 - 仅保留搜索功能
  const filteredBooks = vocabBooks.filter((book) => {
    return !search || 
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.desc.toLowerCase().includes(search.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
  });

  // 修改加载效果，模拟从API获取数据
  useEffect(() => {
    // 设置 loading 为 true (已经默认为true)
    
    // 模拟API请求延迟
    const fetchData = async () => {
      // 实际项目中这里会是真正的数据请求
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* 顶部标题，始终显示 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">词汇</h1>
        </div>
        
        {/* 添加搜索框 */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="搜索词汇集..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 轮播图展示 */}
      {loading ? (
        <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800/30 rounded-lg">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span className="text-gray-700 dark:text-gray-200">加载中...</span>
          </div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center text-gray-400 py-12">没有符合条件的词汇集</div>
      ) : (
        <VocabularyCarousel books={filteredBooks} />
      )}
    </div>
  );
}
