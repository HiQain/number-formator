import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowDown, ArrowUp, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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
  city: string | null;
  tz: ReturnType<typeof lookupAreaCode> extends infer T
    ? T extends { tz: infer U } ? U : null
    : null;
}

type SortKey = "raw" | "currentTime" | "timezone" | "city" | "state";

const COLUMN_LABELS: Array<{ key: SortKey; label: string }> = [
  { key: "raw", label: "Phone Number" },
  { key: "currentTime", label: "Current Time" },
  { key: "timezone", label: "Timezone" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
];

function getSortValue(row: Row, sortKey: SortKey, now: Date): string {
  switch (sortKey) {
    case "raw":
      return row.raw;
    case "currentTime":
      return row.tz ? getCurrentTimeForTz(row.tz, now) : "";
    case "timezone":
      return row.tz ? `${row.tz} ${getTzLabel(row.tz)}` : "";
    case "city":
      return row.city ?? "";
    case "state":
      return row.region ?? "";
    default:
      return "";
  }
}

export function RegionChecker() {
  const [input, setInput] = useState(() => {
    try {
      return sessionStorage.getItem("region:numbers") ?? "";
    } catch {
      return "";
    }
  });
  const [now, setNow] = useState(() => new Date());
  const [sortKey, setSortKey] = useState<SortKey>("raw");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("region:numbers", input);
    } catch {
      // ignore
    }
  }, [input]);

  const rows = useMemo<Row[]>(() => {
    return input
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 200)
      .map((raw) => {
        const areaCode = extractAreaCode(raw);
        const info = areaCode ? lookupAreaCode(areaCode) : null;

        return {
          raw,
          areaCode,
          region: info?.region ?? null,
          city: info?.city ?? null,
          tz: (info?.tz ?? null) as Row["tz"],
        };
      });
  }, [input]);

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const valueA = getSortValue(a, sortKey, now);
      const valueB = getSortValue(b, sortKey, now);
      const primaryCompare = valueA.localeCompare(valueB, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      if (primaryCompare !== 0) return primaryCompare;

      return a.raw.localeCompare(b.raw, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
  }, [now, rows, sortKey]);

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
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {COLUMN_LABELS.map((column) => {
                    const isActive = sortKey === column.key;
                    const Icon = isActive ? ArrowDown : ArrowUp;

                    return (
                      <TableHead
                        key={column.key}
                        className={column.key === "currentTime" || column.key === "timezone" ? "w-[140px]" : undefined}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto px-0 py-0 font-semibold text-foreground hover:bg-transparent"
                          onClick={() => setSortKey(column.key)}
                        >
                          {column.label}
                          <Icon className="h-4 w-4" />
                        </Button>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.map((row, i) => {
                  const recognized = row.region && row.tz;

                  return (
                    <TableRow key={`${row.raw}-${i}`} data-testid={`row-region-${i}`}>
                      <TableCell className="font-mono text-sm">{row.raw}</TableCell>
                      <TableCell>
                        {recognized ? (
                          <span className="inline-flex items-center gap-1.5 font-mono text-sm">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            {getCurrentTimeForTz(row.tz!, now)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          <Badge variant="secondary" className="font-mono">
                            {row.tz} - {getTzLabel(row.tz!)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          row.city ?? <span className="text-muted-foreground">-</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Unknown area code
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          row.region ?? <span className="text-muted-foreground">-</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
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
