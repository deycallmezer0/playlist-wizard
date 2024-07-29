// app/api/create-playlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { name, description, tracks } = await request.json();

    // Create playlist
    const createResponse = await axios.post(`${SPOTIFY_API_BASE}/me/playlists`, 
      { name, description, public: false },
      { headers: { 'Authorization': `Bearer ${session.accessToken}` } }
    );

    const playlistId = createResponse.data.id;

    // Add tracks to playlist
    await axios.post(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
      { uris: tracks },
      { headers: { 'Authorization': `Bearer ${session.accessToken}` } }
    );

    return NextResponse.json({ success: true, playlistId });
  } catch (error) {
    console.error('Error creating playlist:', error);
    return NextResponse.json({ error: 'Failed to create playlist' }, { status: 500 });
  }
}