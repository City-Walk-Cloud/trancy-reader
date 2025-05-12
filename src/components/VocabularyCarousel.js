"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VocabularyBookCard from './VocabularyBookCard';

export default function VocabularyCarousel({ books }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 可见卡片数量，根据屏幕大小可以调整
  const visibleCards = 5;
  
  // 前进到下一张卡片
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  // 返回上一张卡片
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length);
  };

  // 自动播放效果
  useEffect(() => {
    const autoPlay = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(autoPlay);
  }, [currentIndex]);

  // 获取当前可见的卡片
  const getVisibleCards = () => {
    const result = [];
    
    // 计算在视图中的卡片 (前面、当前、后面)
    const halfVisible = Math.floor(visibleCards / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (currentIndex + i + books.length) % books.length;
      const position = i;
      result.push({ index, position });
    }
    
    return result;
  };

  const visibleCardData = getVisibleCards();

  // 计算每个卡片的样式
  const getCardStyle = (position) => {
    // 中心卡片
    if (position === 0) {
      return {
        transform: 'scale(1) translateY(0)',
        zIndex: 10,
        opacity: 1,
        filter: 'brightness(1)'
      };
    }
    
    // 进一步增加卡片间距
    const translateX = position * 160; // 水平偏移增加到160px（原来是120px）
    const scale = 1 - Math.abs(position) * 0.15;
    const opacity = 1 - Math.abs(position) * 0.2;
    const brightness = 1 - Math.abs(position) * 0.2;
    const zIndex = 10 - Math.abs(position);
    
    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex,
      opacity,
      filter: `brightness(${brightness})`,
    };
  };

  return (
    <div className="relative h-[480px] my-12 overflow-hidden -mx-2 md:-mx-6 lg:-mx-8">
      <div className="w-full h-full flex items-center justify-center">
        {/* 卡片容器 */}
        <div className="relative w-full max-w-6xl h-[420px] flex items-center justify-center">
          {/* 轮播指示器 - 圆点 */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {books.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          {/* 卡片 - 保持尺寸，增大间距 */}
          <div className="relative w-full h-full">
            {visibleCardData.map(({ index, position }) => (
              <div
                key={books[index].id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-[28rem] transition-all duration-300"
                style={{
                  ...getCardStyle(position),
                }}
              >
                {/* 修复卡片容器，确保边界正确，移除底部遮罩层 */}
                <div className={`w-full h-full relative transition-all duration-500 ${position === 0 ? 'shadow-lg' : 'shadow-md'}`}>
                  <VocabularyBookCard 
                    book={books[index]} 
                    largeTitle={true} // 传递参数通知卡片组件使用大标题
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 调整控制按钮位置，减少与边缘的距离 */}
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-3 rounded-full shadow-md z-20 hover:bg-white dark:hover:bg-gray-800"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-3 rounded-full shadow-md z-20 hover:bg-white dark:hover:bg-gray-800"
      >
        <ChevronRight className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>
    </div>
  );
}
