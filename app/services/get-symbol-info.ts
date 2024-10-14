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

export async function getSymbolInfo(symbol: string): Promise<GetSymbolInfoResponse> {
  try {
    const response = await fetch(`http://localhost:3000/api/symbol?symbol=${encodeURIComponent(symbol)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      quote: data.quote,
      profile: data.profile,
      recommendations: data.recommendations,
      statusCodes: data.statusCodes,
    };
  } catch (error) {
    console.error("Error fetching symbol info:", error);
    throw error;
  }
}
