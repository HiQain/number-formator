import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, Download, Trash2, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { normalizePhoneNumber, isValidPhoneNumber, formatPhoneNumber } from "@/lib/phone";

interface RowResult {
  original: string;
  formatted: string;
  isValid: boolean;
}

export function BulkValidator() {
  const [results, setResults] = useState<RowResult[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an .xlsx file.",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileName(file.name);
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      if (workbook.SheetNames.length === 0) {
        throw new Error("No sheets found in workbook");
      }

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      if (jsonData.length === 0) {
        toast({
          variant: "destructive",
          title: "Empty file",
          description: "The uploaded file contains no data.",
        });
        setIsProcessing(false);
        return;
      }

      const rows: RowResult[] = [];
      const keys = Object.keys(jsonData[0] as object);
      if (keys.length === 0) {
        throw new Error("No columns found in sheet");
      }

      const firstColKey = keys[0];

      jsonData.forEach((row: any) => {
        if (row[firstColKey] !== undefined && row[firstColKey] !== null) {
          const original = String(row[firstColKey]);
          const digits = normalizePhoneNumber(original);
          const valid = isValidPhoneNumber(digits);

          rows.push({
            original,
            formatted: valid ? formatPhoneNumber(digits, "(555) 123-4567") : "Invalid",
            isValid: valid,
          });
        }
      });

      setResults(rows);
      toast({
        title: "Processing complete",
        description: `Processed ${rows.length} numbers.`,
      });
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error processing file",
        description: err instanceof Error ? err.message : "An unknown error occurred.",
      });
      setFileName(null);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownloadCsv = () => {
    if (results.length === 0) return;

    const csvContent = [["Original", "Formatted"], ...results.map((r) => [`"${r.original.replace(/"/g, '""')}"`, `"${r.formatted}"`])]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `formatted_numbers_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setResults([]);
    setFileName(null);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          Bulk Validator
        </CardTitle>
        <CardDescription>Upload an Excel file to format numbers in bulk</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {!fileName ? (
          <div className="border-2 border-dashed border-muted rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/5 flex-1 transition-colors hover:bg-muted/10">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-1">Upload .xlsx</h3>
            <p className="text-sm text-muted-foreground mb-6">XLSX format only</p>
            <Button onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Select File"}
            </Button>
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden min-h-[300px] border rounded-md">
            <div className="bg-muted px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium truncate">{fileName}</span>
                <span className="text-xs text-muted-foreground ml-2">({results.length} rows)</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadCsv}>
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead>Original</TableHead>
                    <TableHead>Formatted (XXX) XXX-XXXX</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                        No valid data found in file.
                      </TableCell>
                    </TableRow>
                  ) : (
                    results.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-mono text-xs">{row.original}</TableCell>
                        <TableCell>
                          {row.isValid ? (
                            <span className="font-mono text-xs font-medium text-foreground">{row.formatted}</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-sm">
                              <AlertCircle className="h-3 w-3" />
                              {row.formatted}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
