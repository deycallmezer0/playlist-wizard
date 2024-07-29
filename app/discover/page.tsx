// app/discover/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  owner: { display_name: string };
  tracks: { total: number };
}

export default function DiscoverPage() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm) {
      searchPlaylists();
    }
  }, [searchTerm]);

  const searchPlaylists = async () => {
    if (!session) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`/api/search-playlists?q=${encodeURIComponent(searchTerm)}`);
      setPlaylists(response.data);
    } catch (err) {
      setError('Failed to fetch playlists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (playlistId: string) => {
    if (!session) return;

    try {
      await axios.put('/api/follow-playlist', { playlistId });
      alert('Playlist followed successfully!');
    } catch (err) {
      alert('Failed to follow playlist');
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Discover Public Playlists</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for playlists"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border rounded-lg overflow-hidden shadow-md dark:border-gray-700">
            {playlist.images[0] && (
              <img 
                src={playlist.images[0].url} 
                alt={playlist.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{playlist.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{playlist.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">By {playlist.owner.display_name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{playlist.tracks.total} tracks</p>
              <button
                onClick={() => handleFollow(playlist.id)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>

      {playlists.length === 0 && searchTerm && !loading && (
        <div className="text-center text-gray-600 dark:text-gray-300">No playlists found</div>
      )}
    </div>
  );
}