"use client";
import { useEffect, useState } from "react";
import { Effect } from "effect";
import { FavoritesService, FavoritesServiceLive } from "@/lib/favorites";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchFavorites = async () => {
      const effect = Effect.provide(FavoritesService, FavoritesServiceLive).pipe(
        Effect.flatMap((service) => service.getFavorites()),
        Effect.tap((favs) => setFavorites(favs))
      );

      return Effect.runPromise(effect);
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (symbol: string) => {
    const effect = Effect.provide(FavoritesService, FavoritesServiceLive).pipe(
      Effect.flatMap((service) => service.removeFavorite(symbol)),
      Effect.tap(() => Effect.succeed(setFavorites(favorites.filter((fav) => fav !== symbol))))
    );

    return Effect.runPromise(effect);
  };

  return (
    <div className="p-4 h-[calc(100vh-128px)]">
      <h1 className="text-2xl font-bold mb-16 text-white mt-4">Your Favorite Stocks</h1>
      {favorites.length === 0 ? (
        <p className="text-white">You haven't added any favorite stocks yet.</p>
      ) : (
        <div className="flex flex-row flex-wrap gap-4">
          {favorites.map((symbol) => (
            <Card
              key={symbol}
              className="bg-slate-900 hover:bg-slate-800 w-32"
              onClick={() => router.push(`/stocks/symbol/${symbol}`)}
            >
              <CardHeader className="flex flex-row justify-between p-0">
                <CardTitle className="text-white w-full">
                  <div className="flex flex-row justify-between p-4">
                    <div className="text-white mr-10">{symbol}</div>
                    <div onClick={() => handleRemoveFavorite(symbol)}>
                      <StarIcon className="w-4 h-4 self-center text-white fill-white" />
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
