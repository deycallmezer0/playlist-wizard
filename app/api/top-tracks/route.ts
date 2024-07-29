// app/api/top-tracks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const timeRange = searchParams.get('time_range') || 'medium_term';

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/me/top/tracks`, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` },
      params: { time_range: timeRange, limit: 50 }
    });

    return NextResponse.json(response.data.items);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch top tracks' }, { status: 500 });
  }
}
