'use client';
import { useState } from 'react';
import type { Game } from '@/types/Game';
import type { GameStatus } from '@/types/CollectionGame';
import { useGamez } from '@/components/GamezProvider';

type CardItemProps = {
  game: Game
}

const STATUS_OPTIONS: GameStatus[] = ['wishlist', 'backlog', 'playing', 'completed'];

function statusLabel(status: GameStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function CardItem({ game }: CardItemProps) {
  const { games, addGame, updateGame, removeGame } = useGamez();
  const [newStatus, setNewStatus] = useState<GameStatus>('wishlist');

  const stored = games.find((entry) => entry.id === game.id);
  const status = stored ? stored.status : newStatus;

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = e.target.value as GameStatus;
    if (stored) {
      updateGame(game.id, { status: selected });
    } else {
      setNewStatus(selected);
    }
  }

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${game.background_image})`}} title="Woman holding a mug">
      </div>
      <div className="grow border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Rating: {game.metacritic}
          </p>
          <div className="text-gray-700 font-bold text-xl mb-2">{game.name}</div>
          <div className="text-gray-700 mb-2">{game.genres.map((genre) => (
            <span key={genre.id}>{genre.name} </span>
          ))}</div>
          <div className="text-gray-700 text-base">{game.platforms.map((platform) => (

            <span key={platform.platform.id}>{platform.platform.name} </span>
          ))}</div>
        </div>
        <div className="flex items-center">
          {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"> */}
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{game.esrb_rating?.name}</p>
            <p className="text-gray-600">Released {game.released} </p>
          </div>
        </div>
        <div className="text-gray-800 mt-10">
          <label htmlFor="status-select hidden">Choose a Status:</label>
          <select className="mr-7" name="status" id="status-select" value={status} onChange={handleStatusChange}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>{statusLabel(option)}</option>
            ))}
          </select>
          {stored ? (
            <button className="font-semibold text-red-700 cursor-pointer" onClick={() => removeGame(game.id)}>Remove</button>
          ) : (
            <button className="font-semibold text-blue-500 cursor-pointer" onClick={() => addGame(game, status)}>Add</button>
          )}
        </div>
      </div>
    </div>
  )
}
