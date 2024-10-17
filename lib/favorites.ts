import { Effect, Layer } from "effect";

// Define the FavoritesService interface
interface FavoritesService {
  readonly addFavorite: (symbol: string) => Effect.Effect<void>;
  readonly removeFavorite: (symbol: string) => Effect.Effect<void>;
  readonly getFavorites: () => Effect.Effect<string[]>;
}
// Create a Tag for the FavoritesService
const FavoritesService = Effect.Tag("FavoritesService")<
  FavoritesService,
  {
    readonly addFavorite: (symbol: string) => Effect.Effect<void>;
    readonly removeFavorite: (symbol: string) => Effect.Effect<void>;
    readonly getFavorites: () => Effect.Effect<string[]>;
  }
>();

// Implement the FavoritesService
const createFavoritesService = (): FavoritesService => {
  const KEY = "favoriteStocks";

  const getFavoritesFromStorage = Effect.sync(() => {
    const storedFavorites = localStorage.getItem(KEY);
    return (storedFavorites ? JSON.parse(storedFavorites) : []) as string[];
  });

  const setFavoritesToStorage = (favorites: string[]) =>
    Effect.sync(() => {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    });

  return {
    addFavorite: (symbol: string) =>
      Effect.gen(function* (_) {
        const favorites = yield* _(getFavoritesFromStorage);
        if (!favorites.includes(symbol)) {
          const newFavorites = [...favorites, symbol];
          yield* _(setFavoritesToStorage(newFavorites));
        }
      }),

    removeFavorite: (symbol: string) =>
      Effect.gen(function* (_) {
        const favorites = yield* _(getFavoritesFromStorage);
        const newFavorites = favorites.filter((s: string) => s !== symbol);
        yield* _(setFavoritesToStorage(newFavorites));
      }),

    getFavorites: () => getFavoritesFromStorage,
  };
};

// Create a Layer for the FavoritesService
const FavoritesServiceLive = Layer.succeed(FavoritesService, createFavoritesService());

export { FavoritesService, FavoritesServiceLive };
