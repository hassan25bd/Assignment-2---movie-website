import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,15,15,0.3), rgba(15,15,15,0.9)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="text-red-500 font-semibold tracking-widest uppercase text-sm mb-4">Discover Movies</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            MovieExplorer
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed">
            Explore and discover your favorite movies and TV shows from around the world.
          </p>
          <Link
            to="/movies"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors no-underline"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Quick Browse Section */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Browse All Shows</h2>
          <div className="flex justify-center">
            <Link
              to="/movies"
              className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors no-underline"
            >
              View All Shows
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
