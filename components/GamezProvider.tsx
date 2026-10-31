'use client';
import { createContext, useContext, useSyncExternalStore } from 'react';
import type { Game } from '@/types/Game';
import type { CollectionGame, GameStatus, GameUpdate } from '@/types/CollectionGame';
import {
  subscribeToCollection,
  getCollectionSnapshot,
  getEmptyCollection,
  addToCollection,
  updateCollectionGame,
  removeFromCollection,
  importCollection,
  isGameInCollection,
} from '@/lib/collectionStorage';

// The collection state lives inside the storage module (an external
// system, read via useSyncExternalStore). This provider only shares it
// — and a `hydrated` flag — across the app via context.

type GamezContextValue = {
  // Newest added first; empty on the server render, filled from
  // localStorage right after hydration.
  games: CollectionGame[],
  hydrated: boolean,
  isAdded: (id: number) => boolean,
  addGame: (game: Game, status?: GameStatus) => void,
  updateGame: (id: number, patch: GameUpdate) => void,
  removeGame: (id: number) => void,
  // Merges an exported collection file into the current one by id.
  // Returns the number of imported games, or 0 if the text isn't valid.
  importGames: (text: string) => number,
};

const GamezContext = createContext<GamezContextValue | null>(null);

// `hydrated` is false on the server render and true on the client,
// without any setState in an effect.
const noop = () => () => {};
const trueSnapshot = () => true;
const falseSnapshot = () => false;

export default function GamezProvider({ children }: { children: React.ReactNode }) {
  const games = useSyncExternalStore(
    subscribeToCollection,
    getCollectionSnapshot,
    getEmptyCollection,
  );
  const hydrated = useSyncExternalStore(noop, trueSnapshot, falseSnapshot);

  const value: GamezContextValue = {
    games,
    hydrated,
    isAdded: isGameInCollection,
    addGame: addToCollection,
    updateGame: updateCollectionGame,
    removeGame: removeFromCollection,
    importGames: importCollection,
  };

  return (
    <GamezContext.Provider value={value}>
      {children}
    </GamezContext.Provider>
  );
}

export function useGamez(): GamezContextValue {
  const context = useContext(GamezContext);
  if (!context) {
    throw new Error('useGamez must be used within a GamezProvider');
  }
  return context;
}
