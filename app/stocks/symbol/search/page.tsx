import { SearchBar } from "@/components/search-bar";

export default function SearchPage() {
  return (
    <div className="p-4 h-[calc(100vh-128px)]">
      <div className="flex justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-2xl font-bold mb-4 self-center mt-4">Search Stocks</h1>
        </div>
        <div className="flex flex-col">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
