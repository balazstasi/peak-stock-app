import { SearchBar } from "@/components/search-bar";
import { twMerge as tw } from "tailwind-merge";

export default async function SearchPage() {
  return (
    <div className={container}>
      <h1 className={header}>Search Stocks</h1>
      <SearchBar />
    </div>
  );
}

const container = tw("container mx-auto p-4");
const header = tw("text-2xl font-bold mb-4");
