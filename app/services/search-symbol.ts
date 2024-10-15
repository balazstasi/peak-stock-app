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

export const searchSymbol = (
  symbol: string
): Effect.Effect<SymbolSearchResult, SymbolError | NetworkError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(`/api/search?symbol=${encodeURIComponent(symbol)}`);

      if (!response.ok) {
        throw new NetworkError({ status: response.status });
      }

      const data = await response.json();

      if ("error" in data) {
        throw new SymbolError({ message: data.error });
      }

      return data as SymbolSearchResult;
    },
    catch: (error) => {
      console.error("Error fetching symbol data:", error);
      return new SymbolError({ message: "Failed to fetch symbol data" });
    },
  });
