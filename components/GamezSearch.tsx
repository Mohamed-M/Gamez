'use client';
import React, { useState } from 'react';
import type { Game } from '@/types/Game';
import { IoSearchSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";


type GamezSearchProps = {
  onSearch: (games: Game[]) => void;
  onClear: () => void;
  setIsLoading: (loading: boolean) => void;
};

export default function GamezSearch({ onSearch, onClear }: GamezSearchProps) {
  const [query, setQuery] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const response = await fetch(`/api/games?search=${encodeURIComponent(query)}`)
    const games = await response.json();
    onSearch(games.results);
  }

  async function handleClear() {
    setQuery('');
    onClear();

  }

  return (
    <div className="w-full">
    <form className="bg-red-900 text-white flex space-x-7 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <input
        className="w-100 bg-white text-red-900 shadow appearance-none border rounded py-2 px-3"
        type="text"
        placeholder="Search for a game?"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

        <button type="submit" className="flex items-center space-x-2 cursor-pointer py-3 px-4 bg-blue-500 rounded-lg">
          <IoSearchSharp />
          <span>Search</span>
        </button>
        <button type="button" className="flex items-center space-x-2 ml-3 cursor-pointer py-3 px-4 bg-white text-red-800 rounded-lg" onClick={handleClear}>
          <MdCancel />
          <span>Clear</span>
        </button>
    </form>
    </div>
  )
}