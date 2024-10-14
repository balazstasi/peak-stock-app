"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { searchSymbol, SymbolSearchResult } from "@/app/services/symbol";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SymbolSearchResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 0) {
        const searchResults = await searchSymbol(query);
        setResults(searchResults as SymbolSearchResult);
      } else {
        setResults(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/stocks/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm">
      <div className="flex">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a stock symbol..."
          className="flex-grow"
        />
        <Button type="submit" className="ml-2">
          Search
        </Button>
      </div>
      {results && results.count > 0 && (
        <ul className="mt-2 bg-background border border-input rounded-md shadow-sm">
          {results.result
            .filter((item) => {
              return item.type === "Common Stock";
            })
            .slice(0, 10)
            .map((item) => (
              <li
                key={item.symbol}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => {
                  setQuery(item.symbol);
                  router.push(`/stocks/search?q=${encodeURIComponent(item.symbol)}`);
                }}
              >
                {item.symbol} - {item.description}
              </li>
            ))}
        </ul>
      )}
    </form>
  );
}
