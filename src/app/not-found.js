"use client";

import Link from 'next/link';
import { XCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative mb-6">
        <h2 className="text-8xl font-bold text-gray-900 dark:text-gray-100 opacity-10">404</h2>
        <div className="absolute inset-0 flex items-center justify-center">
          <XCircle className="h-16 w-16 text-gray-600 dark:text-gray-400" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">Page Not Found</h1>
      <p className="text-lg mb-8 max-w-md text-gray-600 dark:text-gray-400">
        The page you were looking for doesn&apos;t exist or has been moved.
      </p>
      
      <div className="flex space-x-4">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </button>
        <Link 
          href="/"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}