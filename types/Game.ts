export type Game = {
  id: number,
  name: string,
  background_image: string | null,
  released: string | null,
  metacritic: number,
  esrb_rating: {
    name: string | null
  },
  platforms: [
    platform: {
      platform: {
        id: number,
        name: string
      }
    }
  ]
  genres: [
    genre: {
      id: number,
      name: string,
    }
  ]
}