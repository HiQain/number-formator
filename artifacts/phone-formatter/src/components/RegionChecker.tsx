import { useEffect, useMemo, useState } from "react";
import { MapPin, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  extractAreaCode,
  getCurrentTimeForTz,
  getTzLabel,
  lookupAreaCode,
} from "@/lib/areaCodes";

interface Row {
  raw: string;
  areaCode: string | null;
  region: string | null;
  tz: ReturnType<typeof lookupAreaCode> extends infer T
    ? T extends { tz: infer U } ? U : null
    : null;
}

export function RegionChecker() {
  const [input, setInput] = useState("");
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo<Row[]>(() => {
    return input
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .slice(0, 200)
      .map((raw) => {
        const ac = extractAreaCode(raw);
        const info = ac ? lookupAreaCode(ac) : null;
        return {
          raw,
          areaCode: ac,
          region: info?.region ?? null,
          tz: (info?.tz ?? null) as Row["tz"],
        };
      });
  }, [input]);

  return (
    <Card data-testid="card-region-checker">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle>Check Region & Timezone</CardTitle>
        </div>
        <CardDescription>
          Paste one or more US/Canada phone numbers (one per line) to look up the region and current local time
          based on the area code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="region-input">Phone numbers</Label>
          <Textarea
            id="region-input"
            data-testid="input-region-numbers"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"(415) 555-0123\n212-555-0199\n+1 305 555 0144"}
            className="min-h-[140px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Showing current time as of {now.toLocaleTimeString("en-US")} (your local time).
          </p>
        </div>

        {rows.length > 0 && (
          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="w-[110px]">Area Code</TableHead>
                  <TableHead className="w-[140px]">Current Time</TableHead>
                  <TableHead className="w-[120px]">Timezone</TableHead>
                  <TableHead>Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => {
                  const recognized = row.region && row.tz;
                  return (
                    <TableRow key={i} data-testid={`row-region-${i}`}>
                      <TableCell className="font-mono text-sm">{row.raw}</TableCell>
                      <TableCell className="font-mono">
                        {row.areaCode ?? <span className="text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {getCurrentTimeForTz(row.tz!, now)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          <Badge variant="secondary" className="font-mono">
                            {row.tz} · {getTzLabel(row.tz!)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          row.region
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-destructive text-sm">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Unknown area code
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
