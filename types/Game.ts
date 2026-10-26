export type Game = {
  id: number,
  name: string,
  background_image: string | null,
  released: string | null,
  rating: number,
  metacritic: number
  genres: [
    genre: {
      id: number,
      name: string,
    }
  ]
}