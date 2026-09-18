import { useEffect } from 'react'

export default function MovieModal({ show, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!show) return null

  const backdrop = show.image
    ? (typeof show.image === 'string' ? show.image : show.image.original)
    : null

  const genres = Array.isArray(show.genres)
    ? show.genres
    : show.genres
      ? show.genres.split(', ').filter(Boolean)
      : []
  const rating = show.rating?.average ?? 'N/A'
  const year = show.premiered ? show.premiered.split('-')[0] : 'N/A'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors"
        >
          ✕
        </button>

        {backdrop && (
          <img
            src={backdrop}
            alt={show.name}
            className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        )}

        <div className="p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{show.name}</h2>

          <div className="flex items-center gap-4 text-gray-300 mb-4 text-sm flex-wrap">
            <span>⭐ Rating: {rating}</span>
            <span>|</span>
            <span>📅 Release: {year}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((g) => (
              <span key={g} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-xs">
                {g}
              </span>
            ))}
          </div>

          {show.summary && (
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-1">Overview:</h4>
              <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: show.summary }} />
            </div>
          )}

          {show.language && (
            <p className="text-gray-400 text-sm mb-1"><strong className="text-gray-300">Language:</strong> {show.language}</p>
          )}
          {show.status && (
            <p className="text-gray-400 text-sm mb-1"><strong className="text-gray-300">Status:</strong> {show.status}</p>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ❌ Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
