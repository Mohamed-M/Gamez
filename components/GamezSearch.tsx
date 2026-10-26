'use client';
import { useState } from 'react';
import type { Game } from '@/types/Game';

type GamezSearchProps = {
  onSearch: (games: Game[]) => void;
  onClear: () => void;
};

export default function GamezSearch({ onSearch, onClear }: GamezSearchProps) {
  const [query, setQuery] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const response = await fetch(`/api/games?search=${encodeURIComponent(query)}`)
    const games = await response.json();

    onSearch(games.results);

  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for a game?"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

        <button type="submit" className="search-button">Search</button>
        <button type="button" className="ml-3" onClick={() => onClear()}>Clear</button>
    </form>
  )
}