// components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import NavBar from './NavBar';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto mt-8 px-4 pb-12">
        {children}
      </main>
      <footer className="bg-green-600 dark:bg-green-800 text-white p-4 mt-12">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 Spotify Playlist Creator</p>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn btn-secondary"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </footer>
    </div>
  );
}
