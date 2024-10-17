import { Effect, Data } from "effect";

export interface SymbolSearchResult {
  count: number;
  result: {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }[];
}

class SymbolError extends Data.TaggedError("SymbolError")<{
  message: string;
}> {}

class NetworkError extends Data.TaggedError("NetworkError")<{
  status: number;
}> {}

const fetchApi = (symbol: string) =>
  Effect.tryPromise(() => fetch(`/api/search?symbol=${encodeURIComponent(symbol)}`));

const toJson = (response: Response) => Effect.tryPromise(() => response.json());

export const searchSymbol = (symbol: string) =>
  Effect.gen(function* (_) {
    if (symbol == null || symbol.length === 0) {
      return Effect.fail(new SymbolError({ message: "No symbol provided" }));
    }

    const response = yield* _(fetchApi(symbol));

    if (!response.ok) {
      return Effect.fail(new NetworkError({ status: response.status }));
    }

    const data = yield* _(toJson(response));

    if ("error" in data) {
      return Effect.fail(new SymbolError({ message: data.error }));
    }

    if (data.count === 0) {
      return Effect.fail(new SymbolError({ message: "No results found" }));
    }

    const result = {
      count: data.count,
      result: data.result.filter((item: { type: string; symbol: string }) => {
        return item.type === "Common Stock" && !item.symbol.includes(".");
      }),
    };

    return result;
  }).pipe(
    Effect.catchAll((error) => {
      return Effect.succeed({ result: [], count: 0 } as SymbolSearchResult);
    }),
    Effect.map((data) => data as SymbolSearchResult)
  );
