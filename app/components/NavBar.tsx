// components/NavBar.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard', auth: true },
    { href: '/playlists', label: 'My Playlists', auth: true },
    { href: '/create-playlist', label: 'Create Playlist', auth: true },
    { href: '/profile', label: 'Profile', auth: true },
  ];

  return (
    <nav className="bg-green-600 dark:bg-green-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-green-200 transition-colors duration-200">
          Playlist Wizard
        </Link>
        <div className="flex flex-wrap items-center space-x-4">
          {navLinks.map((link) => (
            ((!link.auth && !session) || (link.auth && session)) && (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white hover:text-green-200 transition-colors duration-200 ${pathname === link.href ? 'font-bold underline' : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}
          {session ? (
            <button
              onClick={() => signOut()}
              className="btn btn-secondary"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="btn btn-secondary"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
