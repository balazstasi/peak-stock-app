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

const fetchStockData = (symbol: string) =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(
        `${STOCK_BASE_URL}/search?q=${encodeURIComponent(symbol)}&token=${STOCK_API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      if (!response.ok) {
        return Effect.fail(
          new StockApiError({ message: `Failed to fetch data from Stock API: ${response.statusText}` })
        );
      }

      return response.json();
    },
    catch: (error) => {
      return Effect.fail(new StockApiError({ message: `Failed to fetch data from Stock API: ${error}` }));
    },
  });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  return Effect.runPromise(
    Effect.gen(function* (_) {
      if (!symbol) {
        return Effect.fail(new MissingSymbolError({ message: "Symbol parameter is required" }));
      }

      const data = yield* _(fetchStockData(symbol));
      return NextResponse.json(data);
    }).pipe(
      Effect.catchAll((error) => {
        if (error instanceof MissingSymbolError) {
          return Effect.succeed(NextResponse.json({ error: error.message }, { status: 400 }));
        }
        if (error instanceof StockApiError) {
          return Effect.succeed(NextResponse.json({ error: error.message }, { status: 500 }));
        }
        return Effect.succeed(NextResponse.json({ error: "Unknown error" }, { status: 500 }));
      })
    )
  );
}
