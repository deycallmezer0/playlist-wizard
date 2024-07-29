import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Spotify Playlist Creator</h1>
        <p className="text-xl mb-8">Create playlists from your top tracks with ease!</p>
        <Link 
          href="/login" 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Log in with Spotify
        </Link>
      </div>

      <div className="mt-12 grid gap-8 text-center md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border border-zinc-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
          <p>We analyze your most played tracks to create the perfect playlist.</p>
        </div>
        <div className="p-6 border border-zinc-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Custom Time Ranges</h2>
          <p>Choose from your top tracks of the last month, 6 months, or all time.</p>
        </div>
        <div className="p-6 border border-zinc-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">One-Click Creation</h2>
          <p>Create your playlist with just one click and start listening instantly.</p>
        </div>
      </div>

      <footer className="mt-16 text-center text-zinc-500">
        <p>© 2024 Spotify Playlist Creator. Not affiliated with Spotify AB.</p>
      </footer>
    </main>
  );
}