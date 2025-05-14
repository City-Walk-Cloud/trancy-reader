"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, Bookmark, Volume2, ExternalLink, 
  MessageCircle, ThumbsUp, Settings, 
  VolumeX, ChevronLeft, ChevronRight, 
  Globe, X, Languages
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// 英文原文和中文翻译示例（实际项目中应从API获取）
const readingData = {
  "1": {
    title: "A Traveler's Morning",
    level: "Beginner",
    category: "Travel",
    author: "Sarah Chen",
    publishDate: "2023-10-15",
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    content: [
      // 每段英文和对应的中文翻译一一对应
      `I woke up early to the sound of birds outside my window. The city was quiet, and the air was fresh. After a quick breakfast, I decided to explore the old streets.`,
      `Walking along the river, I saw people riding bicycles and shop owners opening their doors. A friendly woman smiled and said, "Good morning!" in Japanese.`,
      `I stopped at a small bakery and bought a piece of sweet bread. The baker asked where I was from. "I'm from China," I replied. He nodded and gave me a map of the city.`,
      `Later, I visited a peaceful temple. The garden was full of green trees and colorful flowers. I sat on a bench and listened to the wind in the leaves.`,
      `Traveling alone can feel lonely sometimes, but mornings like this make me feel happy and free.`
    ]
  }
};

// 中文翻译数据
const chineseTranslation = {
  title: "旅行者的早晨",
  content: [
    `我被窗外的鸟叫声唤醒。城市很安静，空气很清新。吃过简单的早餐后，我决定去老街走走。`,
    `沿着河边散步时，我看到有人骑自行车，店主们正在开门。一位友善的女士用日语对我说：“早上好！”`,
    `我在一家小面包店停下，买了一块甜面包。面包师问我来自哪里。“我来自中国。”我回答。他点点头，递给我一张城市地图。`,
    `后来，我参观了一座安静的寺庙。花园里满是绿色的树和五彩的花。我坐在长椅上，听着风吹过树叶的声音。`,
    `一个人旅行有时会觉得孤单，但这样的早晨让我感到快乐和自由。`
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
        <div ref={contentRef} className="prose dark:prose-invert prose-blue max-w-none mb-8 leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}>
          {reading.content.map((paragraph, index) => (
            <div key={index} className="mb-6">
              <ReactMarkdown>{paragraph}</ReactMarkdown>
              {showTranslation && chineseTranslation.content[index] && (
                <div 
                  className="pl-3 border-l-2 border-blue-400 dark:border-blue-600 text-gray-600 dark:text-gray-400 italic transition-all duration-300 ease-in-out"
                  style={{ fontSize: `${Math.max(fontSize - 1, 14)}px` }}
                >
                  <ReactMarkdown>{chineseTranslation.content[index]}</ReactMarkdown>
                </div>
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
    </div>
  );
}
