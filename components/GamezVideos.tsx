'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function GamezVideos({ gamezVideos }) {

  return (
    <div>
      <h2>All Time Games</h2>
      {gamezVideos.map((game) => (
        <div className="card" key={game.id}>
          <Image width={500} height={500} src={game.background_image} alt={`${game.name} image`} />
          <div>{game.metacritic}</div>
          <h3>{game.name}</h3>
          <div>{game.released}</div>
          <ul>{game.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}</ul>
          <span>{game.rating}</span>
        </div>
      ))}
    </div>
  )
}