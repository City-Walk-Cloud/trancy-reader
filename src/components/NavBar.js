import Link from "next/link";
import ThemeToggle from "../theme/theme-toggle";
import { BookOpen, Bookmark, MessagesSquare, Book, UserCircle, Menu, BookText } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 h-14 w-full">
      <div className="mx-auto flex h-full max-w-7xl justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-md font-bold">Trancy Language</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/lessons" className="flex items-center space-x-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Book className="h-4 w-4" />
              <span>课程</span>
            </Link>
            <Link href="/vocabulary" className="flex items-center space-x-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bookmark className="h-4 w-4" />
              <span>词汇</span>
            </Link>
            <Link href="/practice" className="flex items-center space-x-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <MessagesSquare className="h-4 w-4" />
              <span>练习</span>
            </Link>
            <Link href="/reading" className="flex items-center space-x-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <BookText className="h-4 w-4" />
              <span>阅读</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/profile" className="hidden sm:flex items-center space-x-1 text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <UserCircle className="h-4 w-4" />
            <span>我的学习</span>
          </Link>
          <ThemeToggle />
          <button className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="菜单">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
