"use client";
import React, { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { searchSymbol, SymbolSearchResult } from "@/app/services/search-symbol";
import { Effect, pipe } from "effect";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SymbolSearchResult["result"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearchResults = useCallback(
    (searchQuery: string) =>
      pipe(
        Effect.Do,
        Effect.tap(() => setIsLoading(true)),
        Effect.bind("searchResults", () => searchSymbol(searchQuery)),
        Effect.tap(({ searchResults }) => setResults(searchResults.result)),
        Effect.tap(() => setIsLoading(false)),
        Effect.runPromise
      ),
    [debounceTimerRef]
  );

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (newQuery.length > 0) {
      debounceTimerRef.current = setTimeout(() => debouncedSearchResults(newQuery), 300);
    } else {
      setResults(null);
    }
  };

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
          autoFocus
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
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
      {results && results.length > 0 && (
        <ul className="mt-2 bg-background border border-input rounded-md shadow-sm">
          {results.map((item) => (
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
