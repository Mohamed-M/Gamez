'use client';

import { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading'
import GamezSearch from "@/components/GamezSearch";
import CardsList from "@/components/CardsList";

export default function HomePage() {
  const [gamezVideos, setGamezVideos] = useState([]);
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

  async function onSearch(e) {
    setGamezVideos(e);
  };


  return (
    <div>
      <GamezSearch onSearch={onSearch} />
      <CardsList title={'All Time Games'} gamezVideos={gamezVideos} />
    </div>
  );
}
