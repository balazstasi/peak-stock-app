"use client";

import { SymbolQuote } from "@/app/api/symbol/types";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface QuoteChartProps {
  quote: SymbolQuote;
}

export function QuoteChart({ quote }: QuoteChartProps) {
  const data = [
    { name: "Open", value: quote.o },
    { name: "Current", value: quote.c },
    { name: "High", value: quote.h },
    { name: "Low", value: quote.l },
    { name: "Prev Close", value: quote.pc },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
