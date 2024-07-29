// app/api/user-profile/route.ts
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
    const profileResponse = await axios.get(`${SPOTIFY_API_BASE}/me`, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` }
    });

    const topTracksResponse = await axios.get(`${SPOTIFY_API_BASE}/me/top/tracks`, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` },
      params: { limit: 5 }
    });

    return NextResponse.json({
      profile: profileResponse.data,
      topTracks: topTracksResponse.data.items
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}