import { getSymbolInfo } from "@/app/services/get-symbol-info";
import { SymbolInfo } from "@/components/symbol-info";
import { Title } from "@/components/ui/title";

interface SymbolPageProps {
  params: {
    symbol: string;
  };
}

export default async function Symbol({ params }: SymbolPageProps) {
  const symbolInfo = await getSymbolInfo(params.symbol);

  return (
    <div className="container mx-auto p-4">
      <Title size="2xl" className="mb-8 ml-1">
        {`Symbol Info - ${params.symbol}`}
      </Title>
      <SymbolInfo data={symbolInfo} />
    </div>
  );
}
