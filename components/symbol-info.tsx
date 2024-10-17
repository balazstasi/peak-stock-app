"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SymbolData } from "@/app/api/symbol/types";

interface SymbolInfoProps {
  data: SymbolData["profile"];
}

export function SymbolInfo({ data }: SymbolInfoProps) {
  const searchParams = useSearchParams();
  const [interval, setInterval] = useState(searchParams.get("interval") || "1D");

  useEffect(() => {
    const newInterval = searchParams.get("interval");
    if (newInterval) {
      setInterval(newInterval);
    }
  }, [searchParams]);

  const profile = data;

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
                <TableCell>{profile?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Industry</TableCell>
                <TableCell>{profile?.finnhubIndustry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Market Cap</TableCell>
                <TableCell>${profile?.marketCapitalization?.toLocaleString()} B</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Share Outstanding</TableCell>
                <TableCell>{profile?.shareOutstanding?.toLocaleString()} M</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* <Card>
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

      <Card className="md:col-span-2">
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
              {recommendations.map((recommendation) => (
                <TableRow key={recommendation.period} className="text-left">
                  <TableCell>{recommendation.buy.toFixed(2)}</TableCell>
                  <TableCell>{recommendation.hold.toFixed(2)}</TableCell>
                  <TableCell>{recommendation.sell.toFixed(2)}</TableCell>
                  <TableCell>{recommendation.strongBuy.toFixed(2)}</TableCell>
                  <TableCell>{recommendation.strongSell.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}
