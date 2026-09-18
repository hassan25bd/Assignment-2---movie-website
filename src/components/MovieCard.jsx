export default function MovieCard({ movie, onSelect }) {
  const poster = movie.image
    ? (typeof movie.image === 'string' ? movie.image : movie.image.medium)
    : 'https://via.placeholder.com/300x450?text=No+Poster'

  const year = movie.premiered ? movie.premiered.split('-')[0] : 'N/A'
  const rating = movie.rating?.average ?? 'N/A'

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
      <div className="relative">
        <img
          src={poster}
          alt={movie.name}
          className="w-full h-72 object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster' }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-semibold text-lg mb-1 truncate">{movie.name}</h3>
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
          <span>⭐ {rating}</span>
          <span>•</span>
          <span>📅 {year}</span>
        </div>
        <button
          onClick={() => onSelect && onSelect(movie)}
          className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          See Details
        </button>
      </div>
    </div>
  )
}
