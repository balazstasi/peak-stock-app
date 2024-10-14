export interface SymbolSearchResult {
  count: number;
  result: {
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }[];
}

export interface SymbolError {
  error: string;
}

export async function searchSymbol(symbol: string): Promise<SymbolSearchResult | SymbolError> {
  try {
    const response = await fetch(`${process.env.LOCAL_URL}/api/search?symbol=${encodeURIComponent(symbol)}`);

    console.log("🚀 ~ searchSymbol ~ response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if ("error" in data) {
      return data as SymbolError;
    }

    return data as SymbolSearchResult;
  } catch (error) {
    console.error("Error fetching symbol data:", error);
    return { error: "Failed to fetch symbol data" };
  }
}
