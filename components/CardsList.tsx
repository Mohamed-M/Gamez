'use client';
import CardItem from '@/components/CardItem';
import type { Game } from '@/types/Game';

type CardsListProps = {
  gamezVideos: Game[]
  title: string
}

export default function CardsList({ gamezVideos, title }: CardsListProps) {
  return (
    <div className="mb-10 px-7">
      <h2 className="font-semibold text-2xl mb-3 text-gray-100">{title}</h2>
      <div className="flex flex-col space-y-7">
        {gamezVideos.map((game) => (
            <CardItem game={game} key={game.id} />
        ))}
      </div>
    </div>
  )
}