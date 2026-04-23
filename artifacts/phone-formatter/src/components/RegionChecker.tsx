import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  regionDisplay: string | null;
  tz: ReturnType<typeof lookupAreaCode> extends infer T
    ? T extends { tz: infer U } ? U : null
    : null;
}

const FILTER_OPTIONS = [
  { value: "number", label: "Number" },
  { value: "region", label: "Region" },
  { value: "state", label: "State" },
  { value: "city", label: "City" },
  { value: "timezone", label: "Timezone" },
  { value: "areaCode", label: "Area Code" },
] as const;

type FilterField = (typeof FILTER_OPTIONS)[number]["value"];

export function RegionChecker() {
  const [input, setInput] = useState(() => {
    try {
      return sessionStorage.getItem("region:numbers") ?? "";
    } catch {
      return "";
    }
  });
  const [now, setNow] = useState(() => new Date());
  const [filterField, setFilterField] = useState<FilterField>("number");
  const [filterQuery, setFilterQuery] = useState("");

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
          regionDisplay: info?.city ?? info?.region ?? null,
          tz: (info?.tz ?? null) as Row["tz"],
        };
      });
  }, [input]);

  const filteredRows = useMemo(() => {
    const query = filterQuery.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => {
      switch (filterField) {
        case "number":
          return row.raw.toLowerCase().includes(query);
        case "region":
          return `${row.regionDisplay ?? ""} ${row.region ?? ""}`.toLowerCase().includes(query);
        case "state":
          return (row.region ?? "").toLowerCase().includes(query);
        case "city":
          return (row.city ?? "").toLowerCase().includes(query);
        case "timezone":
          return `${row.tz ?? ""} ${row.tz ? getTzLabel(row.tz) : ""}`.toLowerCase().includes(query);
        case "areaCode":
          return (row.areaCode ?? "").toLowerCase().includes(query);
        default:
          return true;
      }
    });
  }, [filterField, filterQuery, rows]);

  const filterLabel =
    FILTER_OPTIONS.find((option) => option.value === filterField)?.label.toLowerCase() ?? "value";

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
          <div className="grid gap-3 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="space-y-2">
              <Label htmlFor="region-filter-field">Filter by</Label>
              <Select value={filterField} onValueChange={(value) => setFilterField(value as FilterField)}>
                <SelectTrigger id="region-filter-field" data-testid="select-region-filter-field">
                  <SelectValue placeholder="Choose a filter" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region-filter-query">Filter value</Label>
              <Input
                id="region-filter-query"
                data-testid="input-region-filter-query"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={`Search by ${filterLabel}`}
              />
            </div>
          </div>
        )}

        {rows.length > 0 && (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="w-[110px]">Area Code</TableHead>
                  <TableHead className="w-[140px]">Current Time</TableHead>
                  <TableHead className="w-[140px]">Timezone</TableHead>
                  <TableHead>Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRows.map((row, i) => {
                  const recognized = row.region && row.tz;

                  return (
                    <TableRow key={`${row.raw}-${i}`} data-testid={`row-region-${i}`}>
                      <TableCell className="font-mono text-sm">{row.raw}</TableCell>
                      <TableCell className="font-mono">
                        {row.areaCode ?? <span className="text-muted-foreground">-</span>}
                      </TableCell>
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
                            {row.tz} · {getTzLabel(row.tz!)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recognized ? (
                          row.regionDisplay
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

                {filteredRows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                      No numbers matched the selected filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
