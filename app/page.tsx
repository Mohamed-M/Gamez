'use client';

import { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading'
import GamezSearch from "@/components/GamezSearch";
import CardsList from "@/components/CardsList";
import type { Game } from '@/types/Game';

export default function HomePage() {
  const [gamezVideos, setGamezVideos] = useState<Game[]>([]);
  const [searchedGamez, setSearchedGamez] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGamez = async () => {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGamezVideos(data.results);
      setIsLoading(false)
    }

    fetchGamez();
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  async function onSearch(games: Game[]) {
    setSearchedGamez(games);
  };

  return (
    <div>
      <GamezSearch onSearch={onSearch} onClear={() => setSearchedGamez([])} setIsLoading={setIsLoading} />
      {searchedGamez.length > 0 && (
        <CardsList title={'Search'} gamezVideos={searchedGamez} />
      )}
      {searchedGamez.length === 0 && (
      <CardsList title={'All Time Games'} gamezVideos={gamezVideos} />
      )}
    </div>
  );
}
