export async function getSymbolInfo(symbol: string): Promise<any> {
  try {
    const response = await fetch(`/api/symbol?symbol=${encodeURIComponent(symbol)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching symbol info:", error);
    throw error;
  }
}
