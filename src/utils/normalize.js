export function normalizeShow(show) {
  if (!show) return show
  return {
    ...show,
    genres: Array.isArray(show.genres)
      ? show.genres
      : show.genres
        ? show.genres.split(', ').filter(Boolean)
        : [],
  }
}

export function normalizeShows(shows) {
  return (shows || []).map(normalizeShow)
}
