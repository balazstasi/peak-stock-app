import { searchSymbol } from "@/app/services/symbol";

export default async function Symbol({ params }: { params: { symbol: string } }) {
  const result = await searchSymbol(params.symbol);

  return (
    <div>
      <h1>Symbol: {params.symbol}</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
