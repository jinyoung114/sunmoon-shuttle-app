export const FAVORITE_STOPS_KEY = "@sunmoon-shuttle/favorite-stops/v1";

export function parseFavoriteStops(raw) {
  if (raw === null) return [];
  const data = JSON.parse(raw);
  if (!Array.isArray(data) || data.some((id) => typeof id !== "string" || id.length === 0)) {
    throw new Error("Invalid favorite stops data");
  }
  return [...new Set(data)];
}

export function toggleFavoriteId(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function searchStops(stops, query, favoriteIds) {
  const normalize = (value) => String(value || "").replace(/\s/g, "").toLowerCase();
  const term = normalize(query);
  const favorites = new Set(favoriteIds);
  const matches = stops.filter((stop) => normalize(stop.name).includes(term) || normalize(stop.id).includes(term));
  // Preserve original order within both groups without mutating the source array.
  return [...matches.filter((stop) => favorites.has(stop.id)), ...matches.filter((stop) => !favorites.has(stop.id))];
}
