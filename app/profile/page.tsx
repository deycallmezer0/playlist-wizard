// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
  followers: { total: number };
  country: string;
  product: string;
}

interface TopTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!session) return;

      try {
        const response = await axios.get('/api/user-profile');
        setProfile(response.data.profile);
        setTopTracks(response.data.topTracks);
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [session]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center mt-8">No profile data available</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        {profile.images[0] && (
          <img 
            src={profile.images[0].url} 
            alt={profile.display_name} 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        )}
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.display_name}</h1>
        <p className="text-gray-600 dark:text-gray-300">{profile.email}</p>
        <p className="text-gray-600 dark:text-gray-300">Followers: {profile.followers.total}</p>

      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Top Tracks</h2>
        <ul className="space-y-2">
          {topTracks.map((track) => (
            <li key={track.id} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <span className="font-semibold text-gray-900 dark:text-white">{track.name}</span>
              <span className="text-gray-600 dark:text-gray-300"> - {track.artists[0].name}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Album: {track.album.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}