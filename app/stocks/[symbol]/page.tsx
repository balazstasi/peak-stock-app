import { getSymbolInfo } from "@/app/services/get-symbol-info";
import { SymbolInfo } from "@/components/symbol-info";
import { Effect } from "effect";
import { twMerge as tw } from "tailwind-merge";

export default async function SymbolPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol;
  const effect = getSymbolInfo(symbol);
  const data = await Effect.runPromise(effect);

  return (
    <div className={container}>
      <h1 className={header}>Symbol | {params.symbol.toUpperCase()}</h1>
      <SymbolInfo
        data={{
          profile: data.profile,
          recommendations: data.recommendations,
        }}
      />
    </div>
  );
}

const container = tw("container mx-auto p-4");
const header = tw("text-3xl font-bold mb-8 w-full p-1 bg-slate-200 rounded-md py-4 px-8");
