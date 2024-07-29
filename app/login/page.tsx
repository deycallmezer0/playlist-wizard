// app/login/page.tsx
'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8">Login to Spotify</h1>
      <button 
        onClick={() => signIn('spotify', { callbackUrl: '/dashboard' })}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Sign in with Spotify
      </button>
    </div>
  );
}