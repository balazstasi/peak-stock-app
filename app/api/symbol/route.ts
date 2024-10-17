import { StockApiResponseData } from "@/app/api/symbol/types";
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

class StockApiResponse extends Data.TaggedError("StockApiResponse")<{
  response: Response;
  data: StockApiResponseData;
}> {}

const fetchStockData = (symbol: string): Effect.Effect<StockApiResponse, StockApiError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${STOCK_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${STOCK_API_KEY}`,
        { next: { revalidate: 3600 } }
      );



      if (!response.ok) {
        throw new StockApiError({ message: "Failed to fetch data from Stock API" });
      }

      return response.json();
    },
    catch: (error) => new StockApiError({ message: `Failed to fetch data from Stock API: ${error}` }),
  });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  return Effect.runPromise(
    Effect.gen(function* (_) {
      if (!symbol) {
        throw new MissingSymbolError({ message: "Symbol parameter is required" });
      }

      const data = yield* _(fetchStockData(symbol));
      return NextResponse.json(data);
    }).pipe(
      Effect.catchAll((error) => {
        if (error instanceof MissingSymbolError) {
          return Effect.succeed(NextResponse.json({ error }, { status: 400 }));
        }
        console.error("Error fetching stock data:", error);
        return Effect.succeed(NextResponse.json({ error }, { status: 500 }));
      })
    )
  );
}
