// app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTopTracks } from '../../lib/spotify';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [timeRange, setTimeRange] = useState<'short_term' | 'medium_term' | 'long_term'>('medium_term');
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken) {
      fetchTopTracks();
    }
  }, [session, timeRange]);

  async function fetchTopTracks() {
    if (!session?.accessToken) return;
    try {
      const tracks = await getTopTracks(session.accessToken, timeRange);
      setTopTracks(tracks);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  }

  if (status === "loading") {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome, {session?.user?.name}!</h1>
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Top Tracks</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => setTimeRange('short_term')} 
            className={`btn ${timeRange === 'short_term' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Last 4 Weeks
          </button>
          <button 
            onClick={() => setTimeRange('medium_term')} 
            className={`btn ${timeRange === 'medium_term' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Last 6 Months
          </button>
          <button 
            onClick={() => setTimeRange('long_term')} 
            className={`btn ${timeRange === 'long_term' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Time
          </button>
        </div>
        <ul className="space-y-4">
          {topTracks.map((track) => (
            <li key={track.id} className="card p-4">
              <div className="font-semibold text-lg">{track.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {track.artists.map(artist => artist.name).join(', ')} • {track.album.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={() => router.push('/create-playlist')}
        className="btn btn-primary"
      >
        Create Playlist
      </button>
    </div>
  );
}
