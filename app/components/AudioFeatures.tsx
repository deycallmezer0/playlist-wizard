// components/AudioFeatures.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AudioFeature {
  id: string;
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  duration_ms: number;
  time_signature: number;
}

interface AudioFeaturesProps {
  trackIds: string[];
}

export default function AudioFeatures({ trackIds }: AudioFeaturesProps) {
  const [features, setFeatures] = useState<AudioFeature[]>([]);
  const [sortKey, setSortKey] = useState<keyof AudioFeature>('energy');

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      try {
        const response = await axios.get(`/api/audio-features?ids=${trackIds.join(',')}`);
        setFeatures(response.data.audio_features);
      } catch (error) {
        console.error('Failed to fetch audio features:', error);
      }
    };

    fetchAudioFeatures();
  }, [trackIds]);

  const sortedFeatures = [...features].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Audio Features</h2>
      <select 
        value={sortKey} 
        onChange={(e) => setSortKey(e.target.value as keyof AudioFeature)}
        className="mb-4 p-2 border rounded"
      >
        <option value="danceability">Danceability</option>
        <option value="energy">Energy</option>
        <option value="valence">Valence</option>
        <option value="tempo">Tempo</option>
      </select>
      <ul className="space-y-2">
        {sortedFeatures.map(feature => (
          <li key={feature.id} className="flex justify-between">
            <span>Track ID: {feature.id}</span>
            <span>{sortKey}: {feature[sortKey].toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}