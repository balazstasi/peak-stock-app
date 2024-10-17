import { getSymbolInfo } from "@/app/services/get-symbol-info";
import { SearchBar } from "@/components/search-bar";
import { SymbolInfo } from "@/components/symbol-info";
import { Effect } from "effect";
import { twMerge as tw } from "tailwind-merge";
import { QuoteChart } from "@/components/quote-chart";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecommendationChart } from "@/components/recommendation-chart";
import { Suspense } from "react";
export default async function SymbolPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;
  const effect = getSymbolInfo(symbol);
  const data = await Effect.runPromise(effect);

  return (
    <Suspense
      fallback={
        <div className="h-[calc(100vh-128px)] flex justify-between items-center mb-16 flex-col sm:flex-row">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <SearchBar />
        </div>
      }
    >
      <div className="flex mt-4 justify-between items-center mb-16 flex-col sm:flex-row">
        <h1 className="text-2xl font-bold mb-4">{symbol}</h1>
        <SearchBar />
      </div>

      <SymbolInfo
        data={{
          profile: data.profile,
          recommendations: data.recommendations,
          quote: data.quote,
        }}
      />

      {data.quote ? (
        <Card className="md:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>Quote Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <QuoteChart quote={data.quote} />
          </CardContent>
        </Card>
      ) : null}

      {data.recommendations.length > 0 ? (
        <Card className="md:col-span-2 mt-4">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <RecommendationChart recommendations={data.recommendations} />
          </CardContent>
        </Card>
      ) : null}
    </Suspense>
  );
}

const container = tw("container mx-auto p-4");
