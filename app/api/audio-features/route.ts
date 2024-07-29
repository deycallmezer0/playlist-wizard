// app/api/audio-features/route.ts
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

  const searchParams = request.nextUrl.searchParams;
  const trackIds = searchParams.get('ids');

  if (!trackIds) {
    return NextResponse.json({ error: 'Track IDs are required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/audio-features`, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` },
      params: { ids: trackIds }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching audio features:', error);
    return NextResponse.json({ error: 'Failed to fetch audio features' }, { status: 500 });
  }
}