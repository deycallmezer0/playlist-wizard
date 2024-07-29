import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import axios, { AxiosResponse } from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
  owner: { display_name: string };
  // Add other relevant fields from the Spotify API response
}

interface SpotifyPlaylistsResponse {
  items: SpotifyPlaylist[];
  next: string | null;
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    let allPlaylists: SpotifyPlaylist[] = [];
    let nextUrl: string | null = `${SPOTIFY_API_BASE}/me/playlists?limit=50`;

    while (nextUrl) {
      const response: AxiosResponse<SpotifyPlaylistsResponse> = await axios.get(nextUrl, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      allPlaylists = [...allPlaylists, ...response.data.items];
      nextUrl = response.data.next;
    }

    return NextResponse.json(allPlaylists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Failed to fetch playlists' }, { status: 500 });
  }
}