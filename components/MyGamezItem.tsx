'use client';
import type { CollectionGame, GameStatus } from '@/types/CollectionGame';
import { useGamez } from '@/components/GamezProvider';

const STATUS_OPTIONS: GameStatus[] = ['wishlist', 'backlog', 'playing', 'completed'];

function statusLabel(status: GameStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

type MyGamezItemProps = {
  game: CollectionGame
}

export default function MyGamezItem({ game }: MyGamezItemProps) {
  const { updateGame, removeGame } = useGamez();

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateGame(game.id, { status: e.target.value as GameStatus });
  }

  function handleRatingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const rating = value === '' ? null : Number(value);
    updateGame(game.id, {
      rating: rating !== null && Number.isFinite(rating)
        ? Math.min(10, Math.max(1, rating))
        : null,
    });
  }

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${game.background_image})`}}>
      </div>
      <div className="grow border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600">
            Added {new Date(game.addedAt).toLocaleDateString()}
          </p>
          <div className="text-gray-700 font-bold text-xl mb-2">{game.name}</div>
          <p className="text-sm text-gray-600">Critic Rating: {game.metacritic ?? '—'}</p>
          <p className="text-gray-600">Released {game.released ?? '—'}</p>
        </div>
        <div className="text-gray-800">
          <label htmlFor={`status-${game.id}`} className="block text-sm text-gray-600">Status:</label>
          <select
            className="mr-7 mt-1 py-1 px-1 border border-gray-300 rounded"
            id={`status-${game.id}`}
            value={game.status}
            onChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>{statusLabel(option)}</option>
            ))}
          </select>
          <label htmlFor={`rating-${game.id}`} className="block text-sm text-gray-600 mt-2">My Rating (1–10):</label>
          <input
            id={`rating-${game.id}`}
            className="w-16 mt-1 py-1 px-2 border border-gray-300 rounded"
            type="number"
            min="1"
            max="10"
            inputMode="numeric"
            value={game.rating ?? ''}
            onChange={handleRatingChange}
          />
        </div>
        <div className="mt-10">
          <button
            className="font-semibold text-red-700"
            onClick={() => removeGame(game.id)}
          >
            Remove from My Gamez
          </button>
        </div>
      </div>
    </div>
  )
}
