// lib/spotify.ts
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export async function getTopTracks(accessToken: string, timeRange: string = 'medium_term', limit: number = 50) {
  const response = await axios.get(`${SPOTIFY_API_BASE}/me/top/tracks`, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
    params: { time_range: timeRange, limit }
  });
  return response.data.items.map((track: any) => ({
    ...track,
    popularity: track.popularity
  }));
}

export async function createPlaylist(accessToken: string, userId: string, name: string, description: string) {
    console.log('Creating playlist with:', { userId, name, description });
    try {
      const response = await axios.post(`${SPOTIFY_API_BASE}/users/${userId}/playlists`, {
        name,
        description,
        public: false
      }, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      console.log('Playlist created successfully:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Spotify API Error:', error.response.data);
      } else {
        console.error('Error:', error);
      }
      throw error;
    }
  }
  
  export async function addTracksToPlaylist(accessToken: string, playlistId: string, trackUris: string[]) {
    console.log('Adding tracks to playlist:', { playlistId, trackCount: trackUris.length });
    try {
      const response = await axios.post(`${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`, {
        uris: trackUris
      }, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      console.log('Tracks added successfully:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Spotify API Error when adding tracks:', error.response.data);
      } else {
        console.error('Error adding tracks:', error);
      }
      throw error;
    }
  }
  
  export async function getUserPlaylists() {
    try {
      const response = await axios.get('/api/playlists');
      return response.data;
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      throw error;
    }
  }
