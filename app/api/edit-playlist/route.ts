// app/api/edit-playlist/route.ts
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

  try {
    const { playlistId, name, description, addTracks, removeTracks } = await request.json();

    // Update playlist details
    await axios.put(`${SPOTIFY_API_BASE}/playlists/${playlistId}`, 
      { name, description },
      { headers: { 'Authorization': `Bearer ${session.accessToken}` } }
    );

    // Add tracks
    if (addTracks && addTracks.length > 0) {
      await axios.post(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
        { uris: addTracks },
        { headers: { 'Authorization': `Bearer ${session.accessToken}` } }
      );
    }

    // Remove tracks
    if (removeTracks && removeTracks.length > 0) {
      await axios.delete(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
        { 
          headers: { 'Authorization': `Bearer ${session.accessToken}` },
          data: { tracks: removeTracks.map(uri => ({ uri })) }
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error editing playlist:', error);
    return NextResponse.json({ error: 'Failed to edit playlist' }, { status: 500 });
  }
}