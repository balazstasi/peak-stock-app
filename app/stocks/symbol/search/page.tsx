import { SearchBar } from "@/components/search-bar";

export default function SearchPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4 self-center">Search Stocks</h1>
        </div>
        <div className="flex flex-col">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
