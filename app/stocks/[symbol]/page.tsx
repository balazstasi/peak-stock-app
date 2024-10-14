import { getSymbolInfo } from "@/app/services/get-symbol-info";
import { SymbolInfo } from "@/components/symbol-info";

export default async function Symbol({ params }: { params: { symbol: string } }) {
  const symbolInfo = await getSymbolInfo(params.symbol);
  console.log("🚀 ~ Symbol ~ symbolInfo:", symbolInfo);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{params.symbol}</h1>
      <SymbolInfo data={symbolInfo} />
    </div>
  );
}
