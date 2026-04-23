import { useState } from "react";
import { Phone, Copy, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { normalizePhoneNumber, isValidPhoneNumber, formatPhoneNumber } from "@/lib/phone";

export function SingleFormatter() {
  const [input, setInput] = useState("");
  const [format, setFormat] = useState("(555) 123-4567");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    setError(null);
    setResult(null);

    if (!input.trim()) {
      setError("Please enter a phone number");
      return;
    }

    const digits = normalizePhoneNumber(input);
    if (!isValidPhoneNumber(digits)) {
      setError("Invalid phone number. Must be 10 digits (or 11 starting with 1).");
      return;
    }

    setResult(formatPhoneNumber(digits, format));
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Phone number copied to clipboard.",
        duration: 2000,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try selecting the text manually.",
      });
    }
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-primary" />
          Single Formatter
        </CardTitle>
        <CardDescription>Format an individual phone number</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-2">
          <Label htmlFor="phone">Enter Phone Number</Label>
          <Input
            id="phone"
            placeholder="e.g. 555 123 4567"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFormat();
            }}
          />
          {error && <p className="text-sm font-medium text-destructive animate-in slide-in-from-top-1">{error}</p>}
        </div>

        <div className="space-y-3">
          <Label>Choose Format</Label>
          <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-2 gap-4">
            {[
              "(555) 123-4567",
              "555-123-4567",
              "555.123.4567",
              "+15551234567"
            ].map((fmt) => (
              <div key={fmt} className="flex items-center space-x-2">
                <RadioGroupItem value={fmt} id={fmt} />
                <Label htmlFor={fmt} className="font-normal cursor-pointer text-sm">
                  {fmt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button onClick={handleFormat} className="w-full">
          Format Number
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Result</Label>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-mono tracking-tight font-medium text-foreground">{result}</span>
              <Button variant="secondary" size="icon" onClick={handleCopy} title="Copy to clipboard" className="hover-elevate">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 border-t mt-auto bg-muted/20">
        <Button variant="ghost" size="sm" onClick={handleReset} className="w-full text-muted-foreground hover:text-foreground">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
