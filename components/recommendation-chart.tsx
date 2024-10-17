"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Recommendation {
  period: string;
  strongBuy: number;
  buy: number;
  hold: number;
  sell: number;
  strongSell: number;
}

interface RecommendationChartProps {
  recommendations: Recommendation[];
}

export function RecommendationChart({ recommendations }: RecommendationChartProps) {
  const data = recommendations.map((rec) => ({
    period: rec.period,
    "Strong Buy": rec.strongBuy,
    Buy: rec.buy,
    Hold: rec.hold,
    Sell: rec.sell,
    "Strong Sell": rec.strongSell,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" tick={{ fill: "white" }} />
        <YAxis tick={{ fill: "white" }} />
        <Tooltip />
        <Legend fill="white" />
        <Bar dataKey="Strong Buy" stackId="a" fill="#4CAF50" />
        <Bar dataKey="Buy" stackId="a" fill="#8BC34A" />
        <Bar dataKey="Hold" stackId="a" fill="#FFC107" />
        <Bar dataKey="Sell" stackId="a" fill="#FF9800" />
        <Bar dataKey="Strong Sell" stackId="a" fill="#F44336" />
      </BarChart>
    </ResponsiveContainer>
  );
}
