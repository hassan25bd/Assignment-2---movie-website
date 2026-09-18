import { useState, useEffect, useRef, useMemo } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { normalizeShows, normalizeShow } from '../utils/normalize.js'

const API_BASE = 'https://api.tvmaze.com'

export default function Movies() {
  const [shows, setShows] = useState([])
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedShow, setSelectedShow] = useState(null)
  const searchTimer = useRef(null)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true)
        setError(false)
        const res = await axios.get(`${API_BASE}/shows`)
        setShows(normalizeShows(res.data))
      } catch (err) {
        console.error('Failed to fetch shows:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchShows()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return shows
    return shows.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, shows])

  const handleSearch = (value) => {
    setSearch(value)
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (value.trim()) {
      setSearching(true)
      searchTimer.current = setTimeout(async () => {
        try {
          const res = await axios.get(`${API_BASE}/search/shows`, {
            params: { q: value },
          })
          setShows(normalizeShows(res.data.map((r) => r.show)))
        } catch (err) {
          console.error('Search failed:', err)
        } finally {
          setSearching(false)
        }
      }, 400)
    } else {
      setSearching(false)
    }
  }

  return (
    <>
      {/* Search Bar */}
      <div className="bg-gray-900 border-b border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-500 text-sm"
            />
            {searching && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Searching...</span>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-6 pt-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 text-sm">
            {loading
              ? 'Loading...'
              : error
                ? <span className="text-red-400">Failed to load shows.</span>
                : `${filtered.length} show${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="flex-grow px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-400 text-lg">Loading shows...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center py-20">
              <p className="text-red-400 text-lg">Something went wrong. Please try again.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex justify-center py-20">
              <p className="text-gray-400 text-lg">No shows found for &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((show) => (
                <MovieCard key={show.id} movie={show} onSelect={setSelectedShow} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movie Modal */}
      {selectedShow && (
        <MovieModal
          show={normalizeShow(selectedShow)}
          onClose={() => setSelectedShow(null)}
        />
      )}
    </>
  )
}
