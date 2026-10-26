'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import GamezSearch from "@/components/GamezSearch";

export default function HomePage() {
  const [videoz, setVideoz] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchGamez = async () => {
      const response = await fetch('')
    }
  }, [])

  return (
    <div>
      <h2>Welcome</h2>
      <GamezSearch />
    </div>
  );
}
