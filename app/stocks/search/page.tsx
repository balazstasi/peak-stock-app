import { searchSymbol, SymbolSearchResult } from "@/app/services/search-symbol";
import { SearchBar } from "@/components/search-bar";
import { Effect } from "effect";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  let results: SymbolSearchResult | null = null;

  if (query) {
    results = await Effect.runPromise(searchSymbol(query));
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Stocks</h1>
      <SearchBar />
      {results && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          {(results && (results as SymbolSearchResult))?.count > 0 ? (
            <ul className="space-y-2">
              {(results as SymbolSearchResult)?.result.map((item) => (
                <li key={item.symbol} className="p-2 bg-card rounded-md">
                  <strong>{item.symbol}</strong> - {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
