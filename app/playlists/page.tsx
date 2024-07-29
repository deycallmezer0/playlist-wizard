// app/playlists/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getUserPlaylists } from '../../lib/spotify';
import Image from 'next/image';

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
}

function PlaylistsPage() {
  const { status } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPlaylists();
    }
  }, [status]);

  useEffect(() => {
    const justCreated = searchParams.get('justCreated');
    if (justCreated === 'true') {
      fetchPlaylists();
    }
  }, [searchParams]);

  async function fetchPlaylists() {
    setIsLoading(true);
    setError(null);
    try {
      const userPlaylists = await getUserPlaylists();
      setPlaylists(userPlaylists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setError('Failed to fetch playlists. Please try again later.');
    }
    setIsLoading(false);
  }

  if (status === "loading" || isLoading) {
    return <div className="text-center mt-10">Loading playlists...</div>;
  }

  if (status === "unauthenticated") {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Playlists</h1>
      <button 
        onClick={fetchPlaylists} 
        className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Playlists
      </button>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {playlist.images && playlist.images[0] && (
              <Image 
                src={playlist.images[0].url} 
                alt={playlist.name} 
                width={500} 
                height={500} 
                className="w-full h-48 object-cover" 
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{playlist.name}</h2>
              <p className="text-gray-600">{playlist.description}</p>
            </div>
          </div>
        ))}
      </div>
      {playlists.length === 0 && !error && !isLoading && (
        <p className="text-center text-gray-600">No playlists found.</p>
      )}
    </div>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaylistsPage />
    </Suspense>
  );
}
