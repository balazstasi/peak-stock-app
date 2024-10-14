"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { searchSymbol, SymbolSearchResult } from "@/app/services/search-symbol";
import { Spinner } from "@/components/ui/spinner";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SymbolSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 0) {
        setIsLoading(true);
        try {
          const searchResults = await searchSymbol(query);
          if ("error" in searchResults) {
            console.error("Error fetching search results:", searchResults.error);
          } else {
            setResults(searchResults);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
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
      <div className="flex relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a stock symbol..."
          className="flex-grow pr-10"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Spinner />
          </div>
        )}
        <Button type="submit" className="ml-2 w-32">
          {isLoading ? <Spinner /> : "Search"}
        </Button>
      </div>
      {results && results.count > 0 && (
        <ul className="mt-2 bg-background border border-input rounded-md shadow-sm">
          {results.result.slice(0, 5).map((item) => (
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
