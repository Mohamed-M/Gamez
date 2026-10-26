'use client';

import Image from 'next/image';
import type { Game } from '@/types/Game';

type CardItemProps = {
  game: Game
}

export default function CardItem({ game }: CardItemProps) {
  return (
    <div className="card min-h-[500px]">
      <Image width={300} height={300} src={game.background_image ?? "https://placehold.co/500x500.png"} alt={`${game.name} image`} loading="eager" />
      <div>{game.metacritic}</div>
      <h3>{game.name}</h3>
      <div>{game.released}</div>
      <ul>{game.genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}</ul>
      <span>{game.rating}</span>
      <div>
        <label htmlFor="status-select">Choose a Status:</label>
        <select name="status" id="status-select">
          <option value="wishlist">Wishlist</option>
          <option value="backlog">Backlog</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  )
}