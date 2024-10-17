import { Effect, Data } from "effect";
import { SymbolQuote, SymbolProfile, SymbolRecommendation } from "@/app/api/symbol/types";

interface GetSymbolInfoResponse {
  quote: SymbolQuote;
  profile: SymbolProfile;
  recommendations: SymbolRecommendation[];
  statusCodes: {
    quoteResponse: number;
    profileResponse: number;
    recommendationResponse: number;
  };
}

class SymbolInfoError extends Data.TaggedError("SymbolInfoError")<{
  message: string;
}> {}

class NetworkError extends Data.TaggedError("NetworkError")<{
  status: number;
}> {}

export const getSymbolInfo = (
  symbol: string
): Effect.Effect<GetSymbolInfoResponse["profile"], SymbolInfoError | NetworkError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(`http://localhost:3000/api/symbol?symbol=${encodeURIComponent(symbol)}`);

      if (!response.ok) {
        throw new NetworkError({ status: response.status });
      }

      const data = await response.json();

      if ("error" in data) {
        throw new SymbolInfoError({ message: data.error });
      }

      return data as GetSymbolInfoResponse["profile"];
    },
    catch: (error) => {
      throw new SymbolInfoError({ message: `Failed to fetch symbol info: ${error}` });
    },
  });
