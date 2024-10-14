import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SymbolInfoProps {
  data: any;
}

export function SymbolInfo({ data }: SymbolInfoProps) {
  const { quote, profile, recommendations, priceTarget } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell>{profile.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Industry</TableCell>
                <TableCell>{profile.finnhubIndustry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Market Cap</TableCell>
                <TableCell>${profile.marketCapitalization.toLocaleString()} B</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Share Outstanding</TableCell>
                <TableCell>{profile.shareOutstanding.toLocaleString()} M</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quote</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Current Price</TableCell>
                <TableCell>${quote.c.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Change</TableCell>
                <TableCell className={quote.d > 0 ? "text-green-600" : "text-red-600"}>
                  ${quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">High</TableCell>
                <TableCell>${quote.h.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Low</TableCell>
                <TableCell>${quote.l.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buy</TableHead>
                <TableHead>Hold</TableHead>
                <TableHead>Sell</TableHead>
                <TableHead>Strong Buy</TableHead>
                <TableHead>Strong Sell</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{recommendations.buy}</TableCell>
                <TableCell>{recommendations.hold}</TableCell>
                <TableCell>{recommendations.sell}</TableCell>
                <TableCell>{recommendations.strongBuy}</TableCell>
                <TableCell>{recommendations.strongSell}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Target</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Target High</TableCell>
                <TableCell>${priceTarget.targetHigh.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Target Low</TableCell>
                <TableCell>${priceTarget.targetLow.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Target Mean</TableCell>
                <TableCell>${priceTarget.targetMean.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Target Median</TableCell>
                <TableCell>${priceTarget.targetMedian.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
