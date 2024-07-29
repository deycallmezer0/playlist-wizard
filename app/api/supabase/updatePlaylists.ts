// app/api/supabase/updatePlaylists.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { getTopTracks, addTracksToPlaylist } from '../../../lib/spotify';

// Define the type for the track parameter
interface Track {
  uri: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { data: userPlaylists, error } = await supabase.from('user_playlists').select('*');
    if (error) {
      console.error('Error fetching user playlists:', error);
      return res.status(500).json({ message: 'Error fetching user playlists' });
    }

    const now = new Date();

    for (const userPlaylist of userPlaylists) {
      const lastUpdated = new Date(userPlaylist.updated_at);
      const nextUpdate = new Date(lastUpdated);
      nextUpdate.setDate(nextUpdate.getDate() + userPlaylist.update_interval);

      if (now >= nextUpdate) {
        try {
          const topTracks: Track[] = await getTopTracks(userPlaylist.access_token, userPlaylist.time_range, userPlaylist.num_of_songs);
          await addTracksToPlaylist(userPlaylist.access_token, userPlaylist.playlist_id, topTracks.map(track => track.uri));

          // Update the updated_at timestamp in the database
          await supabase.from('user_playlists').update({ updated_at: now }).eq('id', userPlaylist.id);
          console.log(`Updated playlist ${userPlaylist.playlist_name}`);
        } catch (error) {
          console.error(`Error updating playlist ${userPlaylist.playlist_name}:`, error);
        }
      }
    }

    res.status(200).json({ message: 'Playlists updated successfully' });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
