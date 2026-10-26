'use client';
import CardItem from '@/components/CardItem';

export default function CardsList({ gamezVideos, title }) {
  return (
    <div>
      <h2 className="mb-3 pl-7">{title}</h2>
      <div className="flex flex-wrap justify-around space-x-7">
        {gamezVideos.map((game) => (
          <div key={game.id} >
            <CardItem game={game} />
            <button onClick={(e) => console.log(e.target)}>Add To</button>
          </div>
        ))}
      </div>
    </div>
  )
}