import { NextRequest, NextResponse } from "next/server";

const FINNHUB_API_KEY = process.env.API_KEY;
const FINNHUB_BASE_URL = process.env.API_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Finnhub API");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
