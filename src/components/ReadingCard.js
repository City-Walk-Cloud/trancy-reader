import { BookOpen, Clock, BarChart, BookmarkPlus } from "lucide-react";
import Link from "next/link";

export default function ReadingCard({ reading }) {
  const {
    id,
    title,
    description,
    coverImage,
    level,
    readingTime,
    category,
    tags
  } = reading;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-44 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {level}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 space-x-4">
          <span className="flex items-center space-x-1">
            <BookOpen className="h-3 w-3" />
            <span>{category}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{readingTime} min</span>
          </span>
          <span className="flex items-center space-x-1">
            <BarChart className="h-3 w-3" />
            <span>{level}</span>
          </span>
        </div>
        
        <h3 className="text-lg font-medium mb-1 text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Link 
            href={`/reading/${id}`}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            开始阅读
          </Link>
          <button 
            className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="Save for later"
          >
            <BookmarkPlus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
