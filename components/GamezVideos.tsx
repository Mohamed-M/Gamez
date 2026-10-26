'use client';
import { useState } from 'react';

export default function GamezVideos({ gamezVideos }) {
  return (
    <div>
      <h2>Latest Games</h2>
      {gamezVideos.map((game) => (
        <div className="card" key={game.id}>
          <h3>{game.name}</h3>
        </div>
      ))}
    </div>
  )
}