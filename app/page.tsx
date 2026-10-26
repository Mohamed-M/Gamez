'use client';

import { useState, useEffect } from 'react';
import LoadingPage from '@/app/loading'
import GamezSearch from "@/components/GamezSearch";
import GamezVideos from "@/components/GamezVideos";

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

  console.log('gamezVideos', gamezVideos)


  return (
    <div>
      <h2>Welcome</h2>
      {/* <GamezSearch /> */}
      <GamezVideos gamezVideos={gamezVideos} />
    </div>
  );
}
