"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, Bookmark, Volume2, ExternalLink, 
  MessageCircle, ThumbsUp, Settings, 
  VolumeX, ChevronLeft, ChevronRight, 
  Globe, X
} from "lucide-react";
import Link from "next/link";

// 英文原文和中文翻译示例（实际项目中应从API获取）
const readingData = {
  "1": {
    title: "A Traveler's Morning",
    level: "Beginner",
    category: "Travel",
    author: "Sarah Chen",
    publishDate: "2023-10-15",
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    content: `
      <p class="mb-4">Every morning, when the sun has just risen, I like to walk around the hotel. The <span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded cursor-pointer" title="sunrise: 日出，黎明">sunrise</span> light is soft, and the city is quiet.</p>
      
      <p class="mb-4">Yesterday, I stopped at a small coffee shop. The owner <span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded cursor-pointer" title="greet: 问候，打招呼">greeted</span> me in the local language: "Good morning!"</p>
      
      <p class="mb-4">I replied with the few phrases I had learned: "Good morning! I would like a coffee, please."</p>
      
      <p class="mb-4">The owner smiled and said: "Your pronunciation is good! Are you a <span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded cursor-pointer" title="tourist: 游客，旅行者">tourist</span>?"</p>
      
      <p class="mb-4">"Yes," I answered, "I'm from America, and this is my first time here."</p>
      
      <p class="mb-4">There were a few locals in the coffee shop. They were all very friendly, and an old gentleman told me about the history of the city.</p>
      
      <p class="mb-4">After I finished my coffee, I continued my morning <span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded cursor-pointer" title="walk: 步行，散步">walk</span>. I saw the market beginning to come alive, with vendors preparing fresh fruits, vegetables, and bread.</p>
      
      <p class="mb-4">When traveling, mornings are the best time. You can see how the city wakes up and experience the daily life of locals. This is more meaningful than visiting <span class="bg-yellow-100 dark:bg-yellow-900 px-1 rounded cursor-pointer" title="tourist attractions: 旅游景点">tourist attractions</span>.</p>
    `
  }
};

// 中文翻译数据
const chineseTranslation = {
  title: "旅行者的早晨",
  content: [
    "每天早晨，当太阳刚刚升起时，我喜欢在酒店附近散步。<span class=\"bg-blue-100 dark:bg-blue-900 px-1 rounded\">日出</span>的光线很柔和，城市也很安静。",
    "昨天，我在一家小咖啡店停下来。店主用当地语言和我<span class=\"bg-blue-100 dark:bg-blue-900 px-1 rounded\">打招呼</span>：\"早上好！\"",
    "我用刚学会的几句话回答：\"早上好！我想要一杯咖啡，谢谢。\"",
    "店主微笑着说：\"你的发音很好！你是<span class=\"bg-blue-100 dark:bg-blue-900 px-1 rounded\">游客</span>吗？\"",
    "\"是的，\"我回答，\"我来自美国，这是我第一次来这里。\"",
    "咖啡店里有几位当地人。他们都很友好，一位老先生告诉我关于这座城市的历史。",
    "我喝完咖啡后，继续我的晨间<span class=\"bg-blue-100 dark:bg-blue-900 px-1 rounded\">散步</span>。我看到市场开始热闹起来，商贩们准备新鲜的水果、蔬菜和面包。",
    "旅行时，早晨是最好的时间。你可以看到城市醒来的样子，感受当地人的日常生活。这比参观<span class=\"bg-blue-100 dark:bg-blue-900 px-1 rounded\">旅游景点</span>更有意义。"
  ]
};

export default function ReadingDetail({ params }) {
  // 兼容 Next.js 新旧 params 处理方式
  let id = "1";
  if (typeof params?.then === "function") {
    const resolvedParams = require("react").use(params);
    id = resolvedParams?.id || "1";
  } else {
    id = params?.id || "1";
  }
  const reading = readingData[id] || readingData["1"];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [wordPosition, setWordPosition] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);

  const contentRef = useRef(null);
  const audioRef = useRef(null);

  // 将HTML内容分割为段落数组 (用于沉浸式翻译)
  const contentParagraphs = reading
    ? reading.content
        .trim()
        .split('<p class="mb-4">')
        .filter(p => p.trim() !== '')
        .map(p => p.replace('</p>', '').trim())
    : [];

  useEffect(() => {
    const currentId = window.location.pathname.split('/').pop() || "1";
    const savedProgress = localStorage.getItem(`reading-progress-${currentId}`);
    if (savedProgress) {
      setReadingProgress(parseInt(savedProgress));
      setTimeout(() => {
        window.scrollTo({
          top: (document.body.scrollHeight * parseInt(savedProgress)) / 100,
          behavior: "smooth"
        });
      }, 500);
    }
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
      setReadingProgress(Math.round(scrollPercent));
      localStorage.setItem(`reading-progress-${currentId}`, Math.round(scrollPercent).toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id]);

  if (!reading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">阅读材料未找到</h1>
        <Link 
          href="/reading"
          className="inline-flex items-center text-blue-600 dark:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> 返回阅读列表
        </Link>
      </div>
    );
  }

  const handleToggleRead = () => {
    if (!audioRef.current) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = reading.title + ". " + contentRef.current.textContent;
      speech.lang = 'zh-CN';
      speech.rate = 0.9;
      speech.onstart = () => setIsPlaying(true);
      speech.onend = () => setIsPlaying(false);
      speech.onpause = () => setIsPlaying(false);
      speech.onresume = () => setIsPlaying(true);
      audioRef.current = speech;
      window.speechSynthesis.speak(speech);
    } else {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          window.speechSynthesis.speak(audioRef.current);
        }
        setIsPlaying(true);
      }
    }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    audioRef.current = null;
    setIsPlaying(false);
  };

  const handleWordClick = (e) => {
    if (e.target.tagName === 'SPAN' && e.target.title) {
      const rect = e.target.getBoundingClientRect();
      setWordPosition({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY
      });
      setCurrentWord({
        word: e.target.innerText,
        definition: e.target.title
      });
      if (!highlightedWords.find(w => w.word === e.target.innerText)) {
        setHighlightedWords([...highlightedWords, {
          word: e.target.innerText,
          definition: e.target.title
        }]);
      }
    }
  };

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6 flex justify-between items-center">
        <Link 
          href="/reading"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> 返回阅读列表
        </Link>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className={`p-2 rounded-md ${showSettings ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} transition-colors`}
            aria-label="阅读设置"
          >
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button 
            onClick={toggleTranslation} 
            className={`p-2 rounded-md ${showTranslation ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} transition-colors`}
            aria-label="显示翻译"
          >
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button 
            onClick={isPlaying ? stopReading : handleToggleRead}
            className={`p-2 rounded-md ${isPlaying ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'} transition-colors`}
            aria-label={isPlaying ? "停止朗读" : "朗读文章"}
          >
            {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded mb-4">
        <div 
          className="h-1 bg-blue-500 rounded transition-all duration-300 ease-in-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">阅读设置</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">字体大小</label>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                className="p-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm w-8 text-center">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                className="p-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">行间距</label>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLineHeight(prev => Math.max(1.2, prev - 0.2))}
                className="p-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm w-8 text-center">{lineHeight.toFixed(1)}</span>
              <button 
                onClick={() => setLineHeight(prev => Math.min(2.4, prev + 0.2))}
                className="p-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          {highlightedWords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">查询的单词</h4>
              <div className="max-h-32 overflow-y-auto">
                {highlightedWords.map((item, index) => (
                  <div key={index} className="text-sm py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="font-medium">{item.word}</span>: 
                    <span className="text-gray-600 dark:text-gray-400 ml-1">{item.definition.split(':')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
              {reading.level}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {reading.category}
            </span>
          </div>
          <button className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {reading.title}
          {showTranslation && (
            <div className="text-xl text-gray-500 dark:text-gray-400 font-normal mt-2 border-l-4 border-blue-500 pl-3 italic">
              {chineseTranslation.title}
            </div>
          )}
        </h1>
      </header>
      {reading.coverImage && (
        <div className="mb-8">
          <img 
            src={reading.coverImage}
            alt={reading.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="relative">
        {showTranslation && (
          <div className="absolute right-0 top-0 bg-white dark:bg-gray-900 shadow-lg rounded-md px-2 py-1 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 dark:text-blue-400">中文翻译已开启</span>
            </div>
          </div>
        )}
        <div ref={contentRef} className="prose dark:prose-invert prose-blue max-w-none mb-8 leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}>
          {contentParagraphs.map((paragraph, index) => (
            <div key={index} className="mb-6">
              <p 
                className="mb-2"
                onClick={handleWordClick}
                dangerouslySetInnerHTML={{ __html: `<p class="mb-0">${paragraph}</p>` }}
              />
              {showTranslation && chineseTranslation.content[index] && (
                <div 
                  className="pl-3 border-l-2 border-blue-400 dark:border-blue-600 text-gray-600 dark:text-gray-400 italic transition-all duration-300 ease-in-out"
                  style={{ fontSize: `${Math.max(fontSize - 1, 14)}px` }}
                  dangerouslySetInnerHTML={{ __html: chineseTranslation.content[index] }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {currentWord && (
        <div 
          className="fixed bg-white dark:bg-gray-800 rounded shadow-lg p-3 z-50 border border-gray-200 dark:border-gray-700 max-w-xs"
          style={{
            left: Math.min(wordPosition.x, window.innerWidth - 280),
            top: wordPosition.y + 5
          }}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-bold">{currentWord.word}</h3>
            <button 
              onClick={() => setCurrentWord(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm mt-1">{currentWord.definition}</p>
          <div className="flex justify-end mt-2">
            <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              添加到生词本
            </button>
          </div>
        </div>
      )}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <ThumbsUp className="h-5 w-5" />
              <span>有帮助</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <MessageCircle className="h-5 w-5" />
              <span>添加笔记</span>
            </button>
          </div>
          <Link 
            href={`/practice?reading=${id}`}
            className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>练习理解</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
