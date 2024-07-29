// components/EditPlaylist.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Track {
  uri: string;
  name: string;
  artists: { name: string }[];
}

interface EditPlaylistProps {
  playlist: {
    id: string;
    name: string;
    description: string;
    tracks: { items: { track: Track }[] };
  };
  onSave: () => void;
}

export default function EditPlaylist({ playlist, onSave }: EditPlaylistProps) {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);
  const [tracks, setTracks] = useState(playlist.tracks.items.map(item => item.track));
  const [newTrackUri, setNewTrackUri] = useState('');

  const handleSave = async () => {
    try {
      await axios.put('/api/edit-playlist', {
        playlistId: playlist.id,
        name,
        description,
        addTracks: [],
        removeTracks: playlist.tracks.items
          .map(item => item.track.uri)
          .filter(uri => !tracks.some(track => track.uri === uri))
      });
      onSave();
    } catch (error) {
      console.error('Failed to save playlist:', error);
    }
  };

  const handleAddTrack = async () => {
    try {
      const response = await axios.get(`/api/search-tracks?q=${encodeURIComponent(newTrackUri)}`);
      const newTrack = response.data[0];
      if (newTrack) {
        setTracks([...tracks, newTrack]);
        setNewTrackUri('');
      }
    } catch (error) {
      console.error('Failed to add track:', error);
    }
  };

  const handleRemoveTrack = (uri: string) => {
    setTracks(tracks.filter(track => track.uri !== uri));
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Playlist name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Playlist description"
      />
      <div>
        <input
          type="text"
          value={newTrackUri}
          onChange={(e) => setNewTrackUri(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add track (Spotify URI or search)"
        />
        <button onClick={handleAddTrack} className="mt-2 bg-green-500 text-white p-2 rounded">Add Track</button>
      </div>
      <ul className="space-y-2">
        {tracks.map(track => (
          <li key={track.uri} className="flex justify-between items-center">
            <span>{track.name} - {track.artists[0].name}</span>
            <button onClick={() => handleRemoveTrack(track.uri)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
    </div>
  );
}
