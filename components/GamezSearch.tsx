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
    <div className="w-full">
    <form className="bg-red-900 flex space-x-7 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <input
        className="w-100 bg-white text-red-900 shadow appearance-none border rounded py-2 px-3"
        type="text"
        placeholder="Search for a game?"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

        <button type="submit" className="search-button cursor-pointer">Search</button>
        <button type="button" className="ml-3 cursor-pointer" onClick={() => onClear()}>Clear</button>
    </form>
    </div>
  )
}