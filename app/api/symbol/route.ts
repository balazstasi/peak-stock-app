import { SymbolQuote, SymbolProfile, SymbolRecommendation } from "@/app/api/symbol/types";
import { NextRequest, NextResponse } from "next/server";

const FINNHUB_API_KEY = process.env.API_KEY;
const FINNHUB_BASE_URL = process.env.API_URL;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");
  console.log("🚀 ~ GET ~ symbol:", symbol);
  if (!symbol) {
    return NextResponse.json({ error: "Symbol parameter is required" }, { status: 400 });
  }

  try {
    const [quoteResponse, profileResponse, recommendationResponse] = await Promise.all([
      fetch(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`${FINNHUB_BASE_URL}/stock/recommendation?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
    ]);

    const [quote, profile, recommendations] = await Promise.all([
      quoteResponse.json(),
      profileResponse.json(),
      recommendationResponse.json(),
    ]);

    if (!quoteResponse.ok || !profileResponse.ok || !recommendationResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch data from Finnhub API",
          details: {
            quote: {
              status: quoteResponse.status,
              statusText: quoteResponse.statusText,
              data: quote,
            },
            profile: {
              status: profileResponse.status,
              statusText: profileResponse.statusText,
              data: profile,
            },
            recommendation: {
              status: recommendationResponse.status,
              statusText: recommendationResponse.statusText,
              data: recommendations,
            },
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      quote: quote as SymbolQuote,
      profile: profile as SymbolProfile,
      recommendations: recommendations as SymbolRecommendation[],
      statusCodes: {
        quoteResponse: quoteResponse.status,
        profileResponse: profileResponse.status,
        recommendationResponse: recommendationResponse.status,
      },
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
