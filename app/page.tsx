import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Playlist Wizard</h1>
          <p className="text-2xl mb-8">Craft the perfect playlist with your top tracks</p>
          <Link 
            href="/login" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 inline-block"
          >
            Get Started with Spotify
          </Link>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-zinc-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">Analyze Your Top Tracks</h3>
              <p>We dive into your listening history to find your favorite tunes.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Time Range</h3>
              <p>Select from recent favorites or all-time classics.</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Playlist</h3>
              <p>With one click, your custom playlist is ready to enjoy.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Features</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-start">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Playlists</h3>
                <p>Create playlists that truly reflect your music taste.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Time-Based Analysis</h3>
                <p>See how your music preferences change over time.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quick Creation</h3>
                <p>Generate playlists in seconds, not minutes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-500 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Popularity Insights</h3>
                <p>Discover how popular your favorite tracks are.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-zinc-500">
          <p>© 2024 Playlist Wizard. Not affiliated with Spotify AB.</p>
        </footer>
      </div>
    </main>
  );
}
