// components/UserProfile.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Profile {
  display_name: string;
  email: string;
  images: { url: string }[];
  followers: { total: number };
}

interface Track {
  name: string;
  artists: { name: string }[];
}

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user-profile');
        setProfile(response.data.profile);
        setTopTracks(response.data.topTracks);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="text-center mb-8">
        {profile.images[0] && (
          <img src={profile.images[0].url} alt={profile.display_name} className="w-32 h-32 rounded-full mx-auto mb-4" />
        )}
        <h1 className="text-3xl font-bold">{profile.display_name}</h1>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600">Followers: {profile.followers.total}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Top Tracks</h2>
        <ul className="space-y-2">
          {topTracks.map((track, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              {track.name} - {track.artists[0].name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}