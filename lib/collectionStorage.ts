import type { Game } from '@/types/Game';
import type { CollectionGame, GameStatus, GameUpdate } from '@/types/CollectionGame';

// Storage layer for the user's game collection.
// All localStorage access goes through this module — components never
// touch storage directly, so swapping storage in the future stays cheap.

const STORAGE_KEY = 'gamez:collection';
export const SCHEMA_VERSION = 1;

const STATUSES: GameStatus[] = ['wishlist', 'backlog', 'playing', 'completed'];

type CollectionSchema = {
  version: number,
  games: CollectionGame[],
};

// migrations[targetVersion] upgrades a collection from (targetVersion - 1).
const migrations: Record<number, (games: CollectionGame[]) => CollectionGame[]> = {};

function migrate(version: number, games: CollectionGame[]): CollectionGame[] {
  let result = games;
  for (let v = version; v < SCHEMA_VERSION; v++) {
    const step = migrations[v + 1];
    if (!step) break; // unknown step — keep the sanitized data as-is
    result = step(result);
  }
  return result;
}

// Only trust records that are recognizably a collection game; coerce the rest.
function sanitizeGame(raw: unknown): CollectionGame | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const record = raw as Record<string, unknown>;
  const id = record.id;
  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) return null;
  const name = record.name;
  if (typeof name !== 'string' || name.length === 0) return null;

  const status = STATUSES.includes(record.status as GameStatus)
    ? record.status as GameStatus
    : 'wishlist';
  const rating = typeof record.rating === 'number'
    && Number.isFinite(record.rating)
      ? Math.min(10, Math.max(1, record.rating))
      : null;
  const metacritic = typeof record.metacritic === 'number' ? record.metacritic : null;
  const released = typeof record.released === 'string' ? record.released : null;
  const addedAt = typeof record.addedAt === 'string' ? record.addedAt : new Date().toISOString();

  return {
    id,
    name,
    background_image: typeof record.background_image === 'string' ? record.background_image : null,
    metacritic,
    released,
    status,
    rating,
    addedAt,
  };
}

export function sortCollection(games: CollectionGame[]): CollectionGame[] {
  return [...games].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

export function loadCollection(): CollectionGame[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed: unknown = JSON.parse(raw);
    let version = SCHEMA_VERSION;
    let list: unknown = parsed;
    if (typeof parsed === 'object' && parsed !== null && 'games' in parsed) {
      const schema = parsed as CollectionSchema;
      version = typeof schema.version === 'number' ? schema.version : SCHEMA_VERSION;
      list = schema.games;
    }
    if (!Array.isArray(list)) return [];
    const games = migrate(version, list)
      .map(sanitizeGame)
      .filter((game): game is CollectionGame => game !== null);
    return sortCollection(games);
  } catch (error) {
    // Corrupt or unreachable storage — start from an empty collection
    // rather than losing the ability to use the app.
    console.warn('gamez: could not load collection', error);
    return [];
  }
}

export function saveCollection(games: CollectionGame[]): void {
  if (typeof window === 'undefined') return;
  try {
    const schema: CollectionSchema = { version: SCHEMA_VERSION, games };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
  } catch (error) {
    console.warn('gamez: could not save collection', error);
  }
}

export function toCollectionGame(game: Game, status: GameStatus): CollectionGame {
  return {
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    metacritic: game.metacritic ?? null,
    released: game.released ?? null,
    status,
    rating: null,
    addedAt: new Date().toISOString(),
  };
}

// Accepts either a bare array of games or a full exported {version, games} file.
export function parseImportText(text: string): CollectionGame[] | null {
  try {
    const parsed: unknown = JSON.parse(text);
    const list = Array.isArray(parsed)
      ? parsed
      : (typeof parsed === 'object' && parsed !== null && Array.isArray((parsed as CollectionSchema).games)
          ? (parsed as CollectionSchema).games
          : null);
    if (!Array.isArray(list)) return null;
    return sortCollection(list
      .map(sanitizeGame)
      .filter((game): game is CollectionGame => game !== null));
  } catch {
    return null;
  }
}

export function serializeCollection(games: CollectionGame[]): string {
  const schema: CollectionSchema = { version: SCHEMA_VERSION, games };
  return JSON.stringify(schema, null, 2);
}

// --- Live store ------------------------------------------------------------
// The collection is an external system (browser storage), so consumers
// subscribe via useSyncExternalStore instead of copying state into React
// state. Same-tab mutations notify listeners directly (the `storage` event
// only fires in other tabs).

const EMPTY_COLLECTION: CollectionGame[] = [];
let snapshotCache: CollectionGame[] = EMPTY_COLLECTION;
let snapshotLoaded = false;
const listeners = new Set<() => void>();

function readFromStorage(): CollectionGame[] {
  return loadCollection();
}

function commit(next: CollectionGame[]): void {
  snapshotCache = next;
  saveCollection(next);
  for (const listener of listeners) listener();
}

function reloadFromStorageAndNotify(): void {
  snapshotCache = readFromStorage();
  snapshotLoaded = true;
  for (const listener of listeners) listener();
}

export function subscribeToCollection(listener: () => void): () => void {
  listeners.add(listener);
  // Keep tabs in sync: another tab writing the collection re-reads it here.
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) reloadFromStorageAndNotify();
  };
  window.addEventListener('storage', handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
  };
}

// Server snapshot: an empty collection (stable reference) so the first
// render matches and React swaps to real data right after hydration.
export function getEmptyCollection(): CollectionGame[] {
  return EMPTY_COLLECTION;
}

export function getCollectionSnapshot(): CollectionGame[] {
  if (!snapshotLoaded) {
    snapshotCache = readFromStorage();
    snapshotLoaded = true;
  }
  return snapshotCache;
}

function commitAdd(game: CollectionGame, games: CollectionGame[]): void {
  if (games.some((entry) => entry.id === game.id)) return;
  commit(sortCollection([game, ...games]));
}

export function addToCollection(game: Game, status: GameStatus = 'wishlist'): void {
  commitAdd(toCollectionGame(game, status), getCollectionSnapshot());
}

export function updateCollectionGame(id: number, patch: GameUpdate): void {
  commit(getCollectionSnapshot().map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
}

export function removeFromCollection(id: number): void {
  commit(getCollectionSnapshot().filter((entry) => entry.id !== id));
}

export function isGameInCollection(id: number): boolean {
  return getCollectionSnapshot().some((entry) => entry.id === id);
}

export function importCollection(text: string): number {
  const current = getCollectionSnapshot();
  const imported = parseImportText(text);
  if (!imported) return 0;
  const byId = new Map(current.map((entry) => [entry.id, entry]));
  for (const game of imported) {
    if (!byId.has(game.id)) byId.set(game.id, game);
  }
  const next = sortCollection([...byId.values()]);
  commit(next);
  return next.length - current.length;
}
