'use client';
import { useState } from 'react';

export default function GamezSearch({ getSearchResult }) {
  const [query, setQuery] = useState();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

  }

  return (
    <form className="search-form" onSubmit="handleSubmit">
      <input
        className="search-input"
        type="text"
        placeholder="What kind of game are interested in?"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />

        <button type="submit" className="search-button">Search</button>
    </form>
  )
}