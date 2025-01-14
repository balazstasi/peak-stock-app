"use client";
import React, { useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { searchSymbol, SymbolSearchResult } from "@/app/services/search-symbol";
import { Effect, pipe } from "effect";

const DEBOUNCE_TIME = 300;

export function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SymbolSearchResult["result"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearchResults = useCallback(
    (searchQuery: string) =>
      pipe(
        Effect.Do,
        Effect.tap(() => Effect.sync(() => setIsLoading(true))),
        Effect.bind("searchResults", () => searchSymbol(searchQuery)),
        Effect.tap(({ searchResults }) => Effect.sync(() => setResults(searchResults.result))),
        Effect.tap(() => Effect.sync(() => setIsLoading(false))),
        Effect.runPromise
      ),
    [debounceTimerRef]
  );

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery.toUpperCase().split(".")[0]);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (newQuery.length > 0) {
      debounceTimerRef.current = setTimeout(() => debouncedSearchResults(newQuery), DEBOUNCE_TIME);
    } else {
      setResults(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/stocks/symbol/${query}`);
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
          className="flex-grow pr-10 text-md text-black placeholder:text-slate-500 bg-slate-200"
        />

        <Button type="submit" disabled={isLoading} className="ml-2 w-32 bg-slate-800 text-white uppercase">
          {isLoading ? <Spinner /> : "Search"}
        </Button>
      </div>
      {results && results.length > 0 && (
        <ul className="absolute top-14 w-[280px] mt-2 bg-background border border-input rounded-md shadow-sm max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.symbol}
              className="p-2 hover:bg-accent cursor-pointer"
              onClick={() => {
                setQuery(item.symbol);
                router.push(`/stocks/symbol/${item.symbol}`);
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
