'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Menu, X } from 'lucide-react';

interface BlogLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  title: string;
  slug: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Introduction',
    slug: '/blog/introduction',
    children: [
      { title: 'Getting Started', slug: '/blog/getting-started' },
      { title: 'Basic Concepts', slug: '/blog/basic-concepts' },
    ],
  },
  {
    title: 'Features',
    slug: '/blog/features',
    children: [
      { title: 'AI Integration', slug: '/blog/ai-integration' },
      { title: 'Blockchain', slug: '/blog/blockchain' },
    ],
  },
];

const MenuItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={`flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
        style={{ paddingLeft: `${depth * 1}rem` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <span className="mr-2">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
        <a
          href={item.slug}
          className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
        >
          {item.title}
        </a>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function BlogLayout({ children }: BlogLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Documentation</h2>
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 lg:pl-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
