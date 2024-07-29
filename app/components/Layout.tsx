// components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <nav className="bg-spotify-green p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Spotify Playlist Creator
          </Link>
          <div className="space-x-4">
            <Link href="/playlists" className="text-white hover:text-gray-200">
              My Playlists
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200">
              Profile
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white hover:text-gray-200"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-8 px-4">
        {children}
      </main>
    </div>
  );
}