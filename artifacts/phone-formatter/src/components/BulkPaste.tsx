import { useState, useMemo } from "react";
import { ClipboardList, Copy, Eraser, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { normalizePhoneNumber, isValidPhoneNumber, formatPhoneNumber } from "@/lib/phone";

const FORMAT_OPTIONS = [
  "(555) 123-4567",
  "555-123-4567",
  "555.123.4567",
  "+15551234567",
] as const;

const MAX_NUMBERS = 500;

export function BulkPaste() {
  const [input, setInput] = useState("");
  const [format, setFormat] = useState<string>(FORMAT_OPTIONS[0]);
  const { toast } = useToast();

  const { lines, formattedLines, validCount, invalidCount, truncated } = useMemo(() => {
    const rawLines = input
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const truncated = rawLines.length > MAX_NUMBERS;
    const limited = rawLines.slice(0, MAX_NUMBERS);

    const results = limited.map((line) => {
      const digits = normalizePhoneNumber(line);
      const valid = isValidPhoneNumber(digits);
      return {
        original: line,
        formatted: valid ? formatPhoneNumber(digits, format) : "Invalid",
        isValid: valid,
      };
    });

    return {
      lines: limited,
      formattedLines: results,
      validCount: results.filter((r) => r.isValid).length,
      invalidCount: results.filter((r) => !r.isValid).length,
      truncated,
    };
  }, [input, format]);

  const outputText = useMemo(
    () => formattedLines.map((r) => r.formatted).join("\n"),
    [formattedLines],
  );

  const handleCopy = async () => {
    if (formattedLines.length === 0) return;
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied",
        description: `${formattedLines.length} numbers copied to clipboard.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
      });
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Paste &amp; Convert (Bulk)
        </CardTitle>
        <CardDescription>
          Paste up to {MAX_NUMBERS} phone numbers (one per line) and format them all at once.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Choose Format</Label>
          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="grid grid-cols-2 md:grid-cols-4 gap-2"
          >
            {FORMAT_OPTIONS.map((opt) => (
              <Label
                key={opt}
                htmlFor={`paste-fmt-${opt}`}
                className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover-elevate has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-colors"
              >
                <RadioGroupItem value={opt} id={`paste-fmt-${opt}`} />
                <span className="font-mono text-xs">{opt}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bulk-input">Input ({lines.length})</Label>
              {truncated && (
                <span className="text-xs text-destructive inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Truncated to first {MAX_NUMBERS}
                </span>
              )}
            </div>
            <Textarea
              id="bulk-input"
              placeholder={"2135551212\n(213) 555-1212\n+1 213 555 1212"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[420px] font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Output</Label>
              <span className="text-xs text-muted-foreground">
                {validCount} valid
                {invalidCount > 0 && (
                  <span className="text-destructive"> · {invalidCount} invalid</span>
                )}
              </span>
            </div>
            <div className="h-[420px] overflow-y-auto border rounded-md bg-muted/20 p-3 font-mono text-sm">
              {formattedLines.length === 0 ? (
                <span className="text-muted-foreground italic">
                  Formatted numbers will appear here...
                </span>
              ) : (
                <ul className="space-y-1">
                  {formattedLines.map((row, idx) => (
                    <li
                      key={idx}
                      className={
                        row.isValid
                          ? "text-foreground"
                          : "text-destructive inline-flex items-center gap-1"
                      }
                    >
                      {row.isValid ? (
                        row.formatted
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 inline" />
                          Invalid: {row.original}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={input.length === 0}
            className="cursor-pointer"
          >
            <Eraser className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button onClick={handleCopy} disabled={formattedLines.length === 0} className="cursor-pointer">
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
