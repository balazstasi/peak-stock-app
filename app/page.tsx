import { SearchBar } from "@/components/search-bar";
import { ModeToggle } from "@/components/theme-selector";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Peak Stock App</h1>
        <ModeToggle />
      </div>
      <SearchBar />
    </div>
  );
}
