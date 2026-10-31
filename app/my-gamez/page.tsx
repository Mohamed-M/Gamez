'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import LoadingPage from '@/app/loading';
import MyGamezItem from '@/components/MyGamezItem';
import { useGamez } from '@/components/GamezProvider';
import { serializeCollection } from '@/lib/collectionStorage';

export default function MyGamezPage() {
  const { games, hydrated, importGames } = useGamez();
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!hydrated) {
    return <LoadingPage />;
  }

  function handleExport() {
    const blob = new Blob([serializeCollection(games)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-gamez.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(selected: File) {
    const text = await selected.text();
    const added = importGames(text);
    setImportMessage(
      added > 0
        ? `Imported ${added} new game${added === 1 ? '' : 's'}`
        : "Nothing new imported — check the file is an exported My Gamez JSON",
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-7">
        <h2 className="font-semibold text-2xl">
          My Gamez <span className="text-gray-500 text-lg">({games.length})</span>
        </h2>
        <div className="flex space-x-3">
          <button className="py-2 px-4 bg-white text-red-800 shadow rounded-lg cursor-pointer" onClick={handleExport}>
            Export
          </button>
          <button
            className="py-2 px-4 bg-white text-red-800 shadow rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Import
          </button>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            accept="application/json,.json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {importMessage && (
        <p className="px-7 mb-3 text-sm text-gray-600">{importMessage}</p>
      )}

      {games.length === 0 ? (
        <div className="px-7 py-16 text-center">
          <p className="text-gray-700 mb-3">No games in your collection yet.</p>
          <Link className="text-blue-500 underline" href="/">
            Find games on the Home page and hit Add
          </Link>
        </div>
      ) : (
        <div className="mb-10 px-7">
          <div className="flex flex-col space-y-7">
            {games.map((game) => (
              <MyGamezItem game={game} key={game.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
