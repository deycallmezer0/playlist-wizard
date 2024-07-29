// app/api/follow-playlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { playlistId } = await request.json();

  try {
    await axios.put(`${SPOTIFY_API_BASE}/playlists/${playlistId}/followers`, {}, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error following playlist:', error);
    return NextResponse.json({ error: 'Failed to follow playlist' }, { status: 500 });
  }
}