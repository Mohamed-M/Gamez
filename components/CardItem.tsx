'use client';
import type { Game } from '@/types/Game';

type CardItemProps = {
  game: Game
}

export default function CardItem({ game }: CardItemProps) {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="w-50 h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${game.background_image})`}} title="Woman holding a mug">
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
          <select className="mr-7" name="status" id="status-select">
            <option value="wishlist">Wishlist</option>
            <option value="backlog">Backlog</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
          </select>
          <button className="font-semibold" onClick={(e) => console.log(e.target)}>Add</button>
        </div>
      </div>
    </div>
  )
}