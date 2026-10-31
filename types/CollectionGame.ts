export type GameStatus = 'wishlist' | 'backlog' | 'playing' | 'completed';

// Slim, self-owned record stored in the browser (localStorage).
// Keep extra fields out: RAWG data can always be re-fetched,
// only the user's own data (status/rating) is persisted here.
export type GameUpdate = {
  status?: GameStatus,
  rating?: number | null,
}

export type CollectionGame = {
  // RAWG game id — doubles as the collection key so "add" can be made idempotent
  id: number,
  name: string,
  background_image: string | null,
  metacritic: number | null,
  released: string | null,
  status: GameStatus,
  rating: number | null,
  addedAt: string, // ISO date string
}
