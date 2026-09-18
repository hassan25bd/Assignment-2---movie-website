import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white no-underline">
        <span className="text-red-600">🎬</span>
        <span>MovieExplorer</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
        <Link
          to="/movies"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Movies
        </Link>
      </div>
    </nav>
  )
}
