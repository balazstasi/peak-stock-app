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
): Effect.Effect<GetSymbolInfoResponse, SymbolInfoError | NetworkError, never> =>
  Effect.tryPromise({
    try: async () => {
      const response = await fetch(`http://localhost:3000/api/symbol?symbol=${encodeURIComponent(symbol)}`);

      if (!response.ok) {
        throw new NetworkError({ status: response.status });
      }

      const data = await response.json();

      return {
        quote: data.quote,
        profile: data.profile,
        recommendations: data.recommendations,
        statusCodes: data.statusCodes,
      };
    },
    catch: (error) => {
      console.error("Error fetching symbol info:", error);
      return new SymbolInfoError({ message: "Failed to fetch symbol info" });
    },
  });
