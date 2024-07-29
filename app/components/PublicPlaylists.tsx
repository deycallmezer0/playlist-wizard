// components/PublicPlaylists.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Playlist {
  id: string;
  name: string;
  owner: { display_name: string };
  images: { url: string }[];
}

export default function PublicPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response = await axios.get(`/api/search-playlists?q=${searchTerm}`);
        setPlaylists(response.data);
      } catch (error) {
        console.error('Failed to fetch public playlists:', error);
      }
    };

    if (searchTerm) {
      fetchPublicPlaylists();
    }
  }, [searchTerm]);

  const handleFollow = async (playlistId: string) => {
    try {
      await axios.put('/api/follow-playlist', { playlistId });
      alert('Playlist followed successfully!');
    } catch (error) {
      console.error('Failed to follow playlist:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Discover Public Playlists</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for playlists"
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="border rounded p-4">
            {playlist.images[0] && (
              <img src={playlist.images[0].url} alt={playlist.name} className="w-full h-40 object-cover mb-2" />
            )}
            <h3 className="font-bold">{playlist.name}</h3>
            <p className="text-sm text-gray-600">By {playlist.owner.display_name}</p>
            <button
              onClick={() => handleFollow(playlist.id)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}