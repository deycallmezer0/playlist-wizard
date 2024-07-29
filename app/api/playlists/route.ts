// app/api/playlists/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    let allPlaylists = [];
    let nextUrl = `${SPOTIFY_API_BASE}/me/playlists?limit=50`;

    while (nextUrl) {
      const response = await axios.get(nextUrl, {
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