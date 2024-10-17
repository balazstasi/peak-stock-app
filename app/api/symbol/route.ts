import {
  StockApiResponseData,
  SymbolProfile,
  SymbolQuote,
  SymbolRecommendation,
} from "@/app/api/symbol/types";
import { Effect, Data } from "effect";
import { NextRequest, NextResponse } from "next/server";

const STOCK_API_KEY = process.env.API_KEY;
const STOCK_BASE_URL = process.env.API_URL;

class MissingSymbolError extends Data.TaggedError("MissingSymbolError")<{
  message: string;
}> {}

class StockApiError extends Data.TaggedError("StockApiError")<{
  message: string;
}> {}

interface StockApiResponse {
  response: Response;
  data: StockApiResponseData;
}

const fetchStockProfile = (symbol: string) =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${STOCK_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${STOCK_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      if (!response.ok) {
        throw new StockApiError({ message: "Failed to fetch data from Stock API" });
      }

      return (await response.json()) as SymbolProfile;
    },
    catch: (error) => new StockApiError({ message: `Failed to fetch data from Stock API: ${error}` }),
  });

const fetchStockRecommendations = (symbol: string) =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${STOCK_BASE_URL}/stock/recommendation?symbol=${encodeURIComponent(symbol)}&token=${STOCK_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      if (!response.ok) {
        throw new StockApiError({ message: "Failed to fetch data from Stock API" });
      }

      return (await response.json()) as SymbolRecommendation[];
    },
    catch: (error) => new StockApiError({ message: `Failed to fetch data from Stock API: ${error}` }),
  });

const fetchStockQuote = (symbol: string) =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${STOCK_BASE_URL}/quote?symbol=${encodeURIComponent(symbol)}&token=${STOCK_API_KEY}`,
        { next: { revalidate: 60 } } // Revalidate every minute
      );

      if (!response.ok) {
        throw new StockApiError({ message: "Failed to fetch quote data from Stock API" });
      }

      return (await response.json()) as SymbolQuote;
    },
    catch: (error) => new StockApiError({ message: `Failed to fetch quote data from Stock API: ${error}` }),
  });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  return Effect.runPromise(
    Effect.gen(function* (_) {
      if (!symbol) {
        return Effect.fail(new MissingSymbolError({ message: "Symbol parameter is required" }));
      }

      const profile = yield* _(fetchStockProfile(symbol));
      const recommendations = yield* _(fetchStockRecommendations(symbol));
      const quote = yield* _(fetchStockQuote(symbol));
      const data = {
        profile,
        recommendations,
        quote,
      };
      return NextResponse.json(data);
    }).pipe(
      Effect.catchAll((error) => {
        if (error instanceof MissingSymbolError) {
          return Effect.succeed(
            NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 })
          );
        }
        return Effect.succeed(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
      })
    )
  );
}
