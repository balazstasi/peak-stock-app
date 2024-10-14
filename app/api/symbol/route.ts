import { NextRequest, NextResponse } from "next/server";

const FINNHUB_API_KEY = process.env.API_KEY;
const FINNHUB_BASE_URL = process.env.API_URL;

export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");
  console.log("🚀 ~ GET ~ symbol:", symbol);
  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 });
  }

  try {
    const [quoteResponse, profileResponse, recommendationResponse] = await Promise.all([
      fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`${FINNHUB_BASE_URL}/stock/profile?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`${FINNHUB_BASE_URL}/stock/recommendation?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
    ]);

    const [quote, profile, recommendations] = await Promise.all([
      quoteResponse.json(),
      profileResponse.json(),
      recommendationResponse.json(),
    ]);

    return NextResponse.json({
      quote,
      profile,
      recommendations: recommendations[0],
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
