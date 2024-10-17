import { Effect, Data } from "effect";
import { SymbolData, SymbolProfile, SymbolRecommendation } from "@/app/api/symbol/types";

interface GetSymbolInfoResponse {
  profile: SymbolProfile;
  recommendations: SymbolRecommendation[];
}

class SymbolInfoError extends Data.TaggedError("SymbolInfoError")<{
  message: string;
}> {}

class NetworkError extends Data.TaggedError("NetworkError")<{
  status: number;
}> {}

const fetchSymbolInfo = (symbol: string) =>
  Effect.tryPromise(() =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/symbol?symbol=${encodeURIComponent(symbol)}`)
  );

const toJson = (response: Response) => Effect.tryPromise(() => response.json());

export const getSymbolInfo = (symbol: string) =>
  Effect.gen(function* (_) {
    if (symbol == null || symbol.length === 0) {
      return Effect.fail(new SymbolInfoError({ message: "No symbol provided" }));
    }

    const response = yield* _(fetchSymbolInfo(symbol));

    if (!response.ok) {
      return Effect.fail(new NetworkError({ status: response.status }));
    }

    const data = yield* _(toJson(response));

    return data;
  }).pipe(
    Effect.catchAll((error) =>
      Effect.fail(new SymbolInfoError({ message: `Failed to fetch symbol info: ${error}` }))
    ),
    Effect.map((data) => data as SymbolData)
  );
