export interface SymbolQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}
export interface SymbolProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export interface SymbolRecommendation {
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
}

export interface SymbolData {
  profile: SymbolProfile;
  recommendations: SymbolRecommendation[];
  quote: SymbolQuote;
}

export interface StockApiResponseData {
  profile: SymbolProfile;
  recommendations: SymbolRecommendation[];
}
