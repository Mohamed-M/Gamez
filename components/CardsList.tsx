'use client';
import CardItem from '@/components/CardItem';

export default function CardsList({ gamezVideos, title }) {
  return (
    <div className="mb-10 px-7">
      <h2 className="font-semibold text-2xl mb-3 pl-7 text-gray-100">{title}</h2>
      <div className="flex flex-wrap justify-around space-x-7">
        {gamezVideos.map((game) => (
            <CardItem game={game} key={game.id} />
        ))}
      </div>
    </div>
  )
}