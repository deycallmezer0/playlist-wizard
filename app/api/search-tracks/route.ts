// app/api/search-tracks/route.ts
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
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
      headers: { 'Authorization': `Bearer ${session.accessToken}` },
      params: { q: query, type: 'track', limit: 20 }
    });

    return NextResponse.json(response.data.tracks.items);
  } catch (error) {
    console.error('Error searching tracks:', error);
    return NextResponse.json({ error: 'Failed to search tracks' }, { status: 500 });
  }
}