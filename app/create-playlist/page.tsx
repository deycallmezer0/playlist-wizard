// app/create-playlist/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../../lib/spotify';
import { supabase } from '../../lib/supabaseClient';

export default function CreatePlaylist() {
  const { data: session } = useSession();
  const [playlistName, setPlaylistName] = useState('My Top Tracks');
  const [playlistDescription, setPlaylistDescription] = useState('Created by Spotify Playlist Creator');
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');
  const [numOfSongs, setNumOfSongs] = useState(20);
  const [updateInterval, setUpdateInterval] = useState(0); // New state for update interval
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleCreatePlaylist(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.accessToken || !session?.user?.id) {
      setError('User session not found. Please try logging in again.');
      return;
    }

    setIsCreating(true);
    setError(null);
    setSuccess(null);
    try {
      const topTracks = await getTopTracks(session.accessToken, timeRange, numOfSongs);
      console.log('Fetched top tracks:', topTracks.length);
      const playlist = await createPlaylist(session.accessToken, session.user.id, playlistName, playlistDescription);
      console.log('Created playlist:', playlist.id);
      await addTracksToPlaylist(session.accessToken, playlist.id, topTracks.map(track => track.uri));
      setSuccess('Playlist created successfully!');

      // Store user information and update interval in Supabase
      await supabase.from('user_playlists').insert({
        user_id: session.user.id,
        playlist_id: playlist.id,
        playlist_name: playlistName,
        playlist_description: playlistDescription,
        time_range: timeRange,
        num_of_songs: numOfSongs,
        update_interval: updateInterval,
      });

      setTimeout(() => router.push('/playlists?justCreated=true'), 2000);
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Failed to create playlist. Please try again.');
    }
    setIsCreating(false);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Playlist</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <form onSubmit={handleCreatePlaylist} className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow-md rounded p-6">
          <label htmlFor="playlistName" className="block mb-2">Playlist Name</label>
          <input
            type="text"
            id="playlistName"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <label htmlFor="playlistDescription" className="block mb-2">Description</label>
          <textarea
            id="playlistDescription"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <label className="block mb-2">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'short_term' | 'medium_term' | 'long_term')}
            className="w-full p-2 border rounded"
          >
            <option value="short_term">Last 4 Weeks</option>
            <option value="medium_term">Last 6 Months</option>
            <option value="long_term">All Time</option>
          </select>
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <label htmlFor="numOfSongs" className="block mb-2">Number of Songs</label>
          <input
            type="number"
            id="numOfSongs"
            value={numOfSongs}
            onChange={(e) => setNumOfSongs(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="bg-white shadow-md rounded p-6">
          <label htmlFor="updateInterval" className="block mb-2">Update Interval (Days)</label>
          <input
            type="number"
            id="updateInterval"
            value={updateInterval}
            onChange={(e) => setUpdateInterval(parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="bg-white shadow-md rounded p-6 text-center">
          <button
            type="submit"
            disabled={isCreating}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isCreating ? 'Creating...' : 'Create Playlist'}
          </button>
        </div>
      </form>
    </div>
  );
}
