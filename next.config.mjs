/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    },
  }
  
  export default nextConfig;