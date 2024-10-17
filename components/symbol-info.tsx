"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SymbolData } from "@/app/api/symbol/types";
import { Effect } from "effect";
import { useEffect, useState } from "react";
import { FavoritesService, FavoritesServiceLive } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
export function SymbolInfo({ data }: { data: SymbolData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const profile = data.profile;
  const recommendations = data.recommendations;
  const quote = data.quote;

  useEffect(() => {
    const checkFavorite = async () => {
      const effect = Effect.provide(FavoritesService, FavoritesServiceLive).pipe(
        Effect.flatMap((service) => service.getFavorites()),
        Effect.map((favorites) => favorites.includes(profile.ticker)),
        Effect.tap((isFavorite) => setIsFavorite(isFavorite)),
        Effect.catchAllCause((cause) => {
          return Effect.succeed(false);
        })
      );
      return Effect.runPromise(effect);
    };

    checkFavorite();
  }, [profile.ticker]);

  const handleToggleFavorite = async () => {
    const effect = Effect.provide(
      isFavorite
        ? FavoritesService.removeFavorite(profile.ticker)
        : FavoritesService.addFavorite(profile.ticker),
      FavoritesServiceLive
    );
    await Effect.runPromise(effect);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {profile ? (
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{profile?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Industry</TableCell>
                  <TableCell>{profile?.finnhubIndustry}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Market Cap</TableCell>
                  <TableCell>${profile?.marketCapitalization?.toLocaleString()} B</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Share Outstanding</TableCell>
                  <TableCell>{profile?.shareOutstanding?.toLocaleString()} M</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button
              onClick={handleToggleFavorite}
              className="mt-4"
              variant={isFavorite ? "destructive" : "default"}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {profile ? (
        <Card>
          <CardHeader>
            <CardTitle>Additional Info</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell className="font-medium">Logo</TableCell>
                  <TableCell>
                    <img src={profile?.logo} alt={profile?.name} width={48} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Country</TableCell>
                  <TableCell>
                    <img
                      src={`https://flagcdn.com/h20/${profile?.country.toLowerCase()}.png`}
                      alt={profile?.country}
                      width={48}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Currency</TableCell>
                  <TableCell>{profile?.currency}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {recommendations.length > 0 ? (
              <TableHeader>
                <TableRow>
                  <TableHead>Buy</TableHead>
                  <TableHead>Hold</TableHead>
                  <TableHead>Sell</TableHead>
                  <TableHead>Strong Buy</TableHead>
                  <TableHead>Strong Sell</TableHead>
                </TableRow>
              </TableHeader>
            ) : null}
            <TableBody>
              {recommendations.length > 0 ? (
                recommendations.map((recommendation) => (
                  <TableRow key={recommendation.period} className="text-left">
                    <TableCell>{recommendation.buy.toFixed(2)}</TableCell>
                    <TableCell>{recommendation.hold.toFixed(2)}</TableCell>
                    <TableCell>{recommendation.sell.toFixed(2)}</TableCell>
                    <TableCell>{recommendation.strongBuy.toFixed(2)}</TableCell>
                    <TableCell>{recommendation.strongSell.toFixed(2)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No recommendations found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {quote ? (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quote</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Current Price</TableCell>
                  <TableCell>${quote.c.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Change</TableCell>
                  <TableCell className={quote.d > 0 ? "text-green-500" : "text-red-500"}>
                    ${quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">High</TableCell>
                  <TableCell>${quote.h.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Low</TableCell>
                  <TableCell>${quote.l.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Open</TableCell>
                  <TableCell>${quote.o.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Previous Close</TableCell>
                  <TableCell>${quote.pc.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
