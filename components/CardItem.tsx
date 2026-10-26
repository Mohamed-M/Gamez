'use client';

import Image from 'next/image';
import type { Game } from '@/types/Game';

type CardItemProps = {
  game: Game
}

export default function CardItem({ game }: CardItemProps) {
  return (
    <div className="card min-h-[400px] max-w-[400px] border border-3 bg-white text-red-800 p-3 mb-7">
      <Image className="block object-cover rounded" width={400} height={200} src={game.background_image ?? "https://placehold.co/400x200.png"} alt={`${game.name} image`} loading="eager" />
      <div>{game.metacritic}</div>
      <h3>{game.name}</h3>
      <div>{game.released}</div>
      <ul>{game.genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}</ul>
      <span>{game.rating}</span>
      <div>
        <label htmlFor="status-select">Choose a Status:</label>
        <select className="mr-7" name="status" id="status-select">
          <option value="wishlist">Wishlist</option>
          <option value="backlog">Backlog</option>
          <option value="playing">Playing</option>
          <option value="completed">Completed</option>
        </select>
        <button className="font-semibold" onClick={(e) => console.log(e.target)}>Add</button>
      </div>
    </div>
  )
}