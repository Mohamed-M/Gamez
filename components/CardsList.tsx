'use client';
import CardItem from '@/components/CardItem';

export default function CardsList({ gamezVideos, title }) {
  return (
    <div>
      <h2>{title}</h2>
      {gamezVideos.map((game) => (
        <div key={game.id} >
          <CardItem game={game} />
          <button onClick={(e) => console.log(e.target)}>Add To</button>
        </div>
      ))}
    </div>
  )
}